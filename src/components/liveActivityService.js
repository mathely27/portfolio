/**
 * Live Activity Service for GitHub (@mathely27) and LeetCode (@mathely_27).
 *
 * Real-time dynamic fetch with immediate cached fallback so the website
 * renders instantly and updates live on mount.
 */

import {
  REAL_GITHUB_COUNT as FALLBACK_GH_COUNT,
  REAL_LEETCODE_COUNT as FALLBACK_LC_COUNT,
  GITHUB_MONTHS as FALLBACK_GH_MONTHS,
  LEETCODE_MONTHS as FALLBACK_LC_MONTHS
} from './contributionData';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Transforms daily contribution entries into 7-day Monday-to-Sunday columns
 * grouped by month clusters to maintain exact layout alignment.
 */
export function buildMonthsMatrix7x(dailyList) {
  if (!dailyList || !dailyList.length) return null;

  const monthGroups = {};
  dailyList.forEach((item) => {
    const ym = item.date.slice(0, 7);
    if (!monthGroups[ym]) monthGroups[ym] = [];
    monthGroups[ym].push(item);
  });

  const sortedYM = Object.keys(monthGroups).sort();
  const months = [];

  sortedYM.forEach((ym) => {
    const monthNum = parseInt(ym.slice(5, 7), 10) - 1;
    const label = MONTH_NAMES[monthNum] || ym;
    const days = monthGroups[ym];

    const byDate = {};
    days.forEach((d) => {
      byDate[d.date] = d;
    });

    const d0 = new Date(days[0].date + 'T00:00:00Z');
    const dLast = new Date(days[days.length - 1].date + 'T00:00:00Z');

    // Monday-aligned offset: 0=Mon ... 6=Sun
    const firstDayIdx = (d0.getUTCDay() + 6) % 7;
    const cur = new Date(d0);
    cur.setUTCDate(cur.getUTCDate() - firstDayIdx);

    const weeks = [];
    let curWeek = [];

    while (cur <= dLast || curWeek.length > 0) {
      const dtStr = cur.toISOString().split('T')[0];
      const dayIdx = (cur.getUTCDay() + 6) % 7;
      const found = byDate[dtStr];

      curWeek.push({
        date: dtStr,
        level: found
          ? typeof found.level === 'number'
            ? found.level
            : found.count > 4
            ? 4
            : found.count > 2
            ? 3
            : found.count > 0
            ? 2
            : 0
          : 0,
        count: found ? found.count : 0,
        day: dayIdx,
        isPad: !found
      });

      if (curWeek.length === 7) {
        weeks.push(curWeek);
        curWeek = [];
        if (cur > dLast) break;
      }
      cur.setUTCDate(cur.getUTCDate() + 1);
    }

    if (weeks.length > 0) {
      months.push({
        month: label,
        yearMonth: ym,
        weeks
      });
    }
  });

  return months;
}

/**
 * Live GitHub fetcher
 */
export async function fetchLiveGitHub(username = 'mathely27') {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const count = data.total?.lastYear ?? 269;
    const months = buildMonthsMatrix7x(data.contributions);
    return {
      count: String(count),
      months: months && months.length ? months : FALLBACK_GH_MONTHS,
      live: true
    };
  } catch (err) {
    console.warn('Using baked GitHub data:', err);
    return {
      count: FALLBACK_GH_COUNT,
      months: FALLBACK_GH_MONTHS,
      live: false
    };
  }
}

/**
 * Live LeetCode fetcher
 */
export async function fetchLiveLeetCode(username = 'mathely_27') {
  try {
    const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const totalSolved = data.totalSolved ?? 154;

    const cal = data.submissionCalendar || {};
    const submissionsByDate = {};
    Object.entries(cal).forEach(([ts, cnt]) => {
      const dateStr = new Date(parseInt(ts, 10) * 1000).toISOString().split('T')[0];
      submissionsByDate[dateStr] = cnt;
    });

    const today = new Date();
    const dailyList = [];
    for (let i = 370; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = submissionsByDate[dateStr] || 0;
      let level = 0;
      if (count > 8) level = 4;
      else if (count >= 5) level = 3;
      else if (count >= 2) level = 2;
      else if (count >= 1) level = 1;

      dailyList.push({
        date: dateStr,
        count,
        level
      });
    }

    const months = buildMonthsMatrix7x(dailyList);
    return {
      count: String(totalSolved),
      months: months && months.length ? months : FALLBACK_LC_MONTHS,
      live: true
    };
  } catch (err) {
    console.warn('Using baked LeetCode data:', err);
    return {
      count: FALLBACK_LC_COUNT,
      months: FALLBACK_LC_MONTHS,
      live: false
    };
  }
}
