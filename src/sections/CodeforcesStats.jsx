import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Award, TrendingUp, Calendar, Trophy, AlertTriangle, ExternalLink } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { GitHubCalendar } from "react-github-calendar";
import Container from "../components/Container";
import SectionTitle from "../components/SectionTitle";

const cfHandle = "tanjim999";
const githubUsername = "tanjim041";

const calendarTheme = {
  light: ["#e8e6df", "#D04F1E"],
  dark: ["#1e1e24", "#FF7E47"],
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const dateStr = new Date(data.ratingUpdateTimeSeconds * 1000).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return (
      <div className="bg-card border border-border p-3 rounded shadow-lg font-mono text-[10px]">
        <p className="text-accent-primary font-bold mb-1 truncate max-w-[200px]">{data.contestName}</p>
        <p className="text-text-main">Rating: <span className="text-accent-primary font-bold">{data.newRating}</span></p>
        <p className="text-text-muted">Rank: {data.rank}</p>
        <p className="text-text-muted/60">{dateStr}</p>
      </div>
    );
  }
  return null;
};

const HeatmapSkeleton = () => (
  <div className="w-full flex flex-col items-center py-4 animate-pulse">
    <div className="flex gap-[3px] overflow-hidden w-full max-w-4xl justify-center">
      {[...Array(35)].map((_, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-[3px]">
          {[...Array(7)].map((_, rowIdx) => (
            <div
              key={rowIdx}
              className="w-[10px] h-[10px] bg-secondary rounded-[1px]"
            />
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default function CodeforcesStats() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState(null);
  const [ratingData, setRatingData] = useState([]);
  const [accentColor, setAccentColor] = useState("#FF7E47");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // GitHub contribution state
  const [githubError, setGithubError] = useState(false);
  const [githubLoading, setGithubLoading] = useState(true);

  // Track theme to update Recharts accent color and calendar scheme dynamically
  useEffect(() => {
    const checkTheme = () => {
      const darkActive = document.documentElement.classList.contains("dark");
      setIsDark(darkActive);
      setAccentColor(darkActive ? "#FF7E47" : "#D04F1E");
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  // Fetch Codeforces data
  useEffect(() => {
    const fetchCFData = async () => {
      try {
        setLoading(true);
        setError(false);

        const [infoRes, ratingRes] = await Promise.all([
          fetch(`https://codeforces.com/api/user.info?handles=${cfHandle}`),
          fetch(`https://codeforces.com/api/user.rating?handle=${cfHandle}`)
        ]);

        if (!infoRes.ok || !ratingRes.ok) {
          throw new Error("Failed to fetch data from Codeforces API");
        }

        const infoJson = await infoRes.json();
        const ratingJson = await ratingRes.json();

        if (infoJson.status !== "OK" || ratingJson.status !== "OK") {
          throw new Error("Invalid API response status");
        }

        setUserData(infoJson.result[0]);
        setRatingData(ratingJson.result);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCFData();
  }, []);

  // Check GitHub connectivity to verify loading and fallback states
  useEffect(() => {
    fetch(`https://github-contributions.vercel.app/api/v1/${githubUsername}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load GitHub calendar");
        setGithubLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setGithubError(true);
        setGithubLoading(false);
      });
  }, []);

  // Format date ticks for X-Axis
  const formatXAxis = (tickItem) => {
    return new Date(tickItem * 1000).toLocaleDateString(undefined, {
      month: "short",
      year: "2-digit"
    });
  };

  const getRankColorClass = (rank) => {
    const r = rank?.toLowerCase() || "";
    if (r.includes("legendary") || r.includes("grandmaster")) return "text-red-500";
    if (r.includes("master")) return "text-orange-400";
    if (r.includes("candidate")) return "text-purple-400";
    if (r.includes("expert")) return "text-blue-400";
    if (r.includes("specialist")) return "text-cyan-400";
    if (r.includes("pupil")) return "text-green-400";
    return "text-text-muted";
  };

  return (
    <section id="codeforces" className="py-32 lg:py-48 bg-background relative overflow-hidden" aria-label="Developer & CP Metrics">
      <Container>
        <SectionTitle prefix="Developer &" accent="CP Metrics" number="06" />

        {loading ? (
          /* Loading Skeletons with matching height to avoid layout shift */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Skeletons column */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card border border-border p-5 rounded h-[90px] flex items-center gap-4 animate-pulse">
                  <div className="w-10 h-10 bg-secondary rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-secondary rounded w-1/3" />
                    <div className="h-4 bg-secondary rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
            {/* Chart Skeleton */}
            <div className="lg:col-span-8 bg-card border border-border p-6 rounded min-h-[350px] flex flex-col justify-between animate-pulse">
              <div className="h-4 bg-secondary rounded w-1/4" />
              <div className="flex-1 bg-secondary/50 rounded mt-6 w-full h-[250px]" />
            </div>
          </div>
        ) : error ? (
          /* Fail Graceful Fallback Card */
          <motion.div
            className="bg-card border border-border rounded p-8 max-w-2xl mx-auto text-center flex flex-col items-center shadow-lg"
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <AlertTriangle className="w-12 h-12 text-accent-primary mb-4" />
            <h3 className="font-poppins text-lg font-bold text-text-main mb-2">Live CP Stats Temporarily Offline</h3>
            <p className="text-text-muted text-sm mb-6 leading-relaxed">
              We are unable to reach Codeforces public APIs at this moment. You can view Tanjim's active submissions, rating graph, and programming contests history directly on his profile.
            </p>
            <a
              href={`https://codeforces.com/profile/${cfHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-accent-primary text-background font-mono text-xs uppercase tracking-widest font-bold hover:bg-accent-secondary hover-glow transition-all duration-300 flex items-center gap-2 rounded cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" /> View Codeforces Profile
            </a>
          </motion.div>
        ) : (
          /* Live Rendered Content */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Sidebar Stats Grid */}
            <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {/* Current Rating */}
              <div className="bg-card border border-border p-5 rounded flex items-center gap-4 hover:border-accent-primary/40 transition-colors group">
                <div className="p-2.5 bg-accent-primary/10 text-accent-primary rounded">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block mb-1">Current Rating</span>
                  <span className="font-mono text-lg font-bold text-text-main">{userData?.rating || "Unrated"}</span>
                </div>
              </div>

              {/* Max Rating */}
              <div className="bg-card border border-border p-5 rounded flex items-center gap-4 hover:border-accent-primary/40 transition-colors group">
                <div className="p-2.5 bg-accent-primary/10 text-accent-primary rounded">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block mb-1">Max Rating</span>
                  <span className="font-mono text-lg font-bold text-text-main">{userData?.maxRating || "N/A"}</span>
                </div>
              </div>

              {/* Rank */}
              <div className="bg-card border border-border p-5 rounded flex items-center gap-4 hover:border-accent-primary/40 transition-colors group">
                <div className="p-2.5 bg-accent-primary/10 text-accent-primary rounded">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block mb-1">Rank Title</span>
                  <span className={`font-poppins text-sm font-bold uppercase tracking-wider ${getRankColorClass(userData?.rank)}`}>
                    {userData?.rank || "Newbie"}
                  </span>
                </div>
              </div>

              {/* Contests participated */}
              <div className="bg-card border border-border p-5 rounded flex items-center gap-4 hover:border-accent-primary/40 transition-colors group">
                <div className="p-2.5 bg-accent-primary/10 text-accent-primary rounded">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block mb-1">Contests Played</span>
                  <span className="font-mono text-lg font-bold text-text-main">{ratingData.length}</span>
                </div>
              </div>
            </div>

            {/* Interactive Progression Graph */}
            <motion.div
              className="lg:col-span-8 bg-card border border-border p-6 rounded flex flex-col justify-between hover:border-accent-primary/40 transition-colors"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
              whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            >
              <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
                <div>
                  <h4 className="font-poppins text-xs font-bold text-text-main uppercase tracking-wider">Rating History</h4>
                  <p className="font-mono text-[9px] text-text-muted uppercase tracking-widest mt-1">Live Progression Graph</p>
                </div>
                <a
                  href={`https://codeforces.com/profile/${cfHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-accent-primary hover:text-accent-secondary uppercase tracking-widest flex items-center gap-1 transition-colors"
                >
                  CF Profile <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="flex-1 w-full h-[250px] min-h-[250px] font-mono text-[9px] text-text-muted">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={ratingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis
                      dataKey="ratingUpdateTimeSeconds"
                      tickFormatter={formatXAxis}
                      stroke="var(--color-text-muted)"
                      dy={10}
                      tickLine={false}
                    />
                    <YAxis
                      domain={["dataMin - 100", "dataMax + 100"]}
                      stroke="var(--color-text-muted)"
                      dx={-10}
                      tickLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--color-border)", strokeWidth: 1 }} />
                    <Line
                      type="monotone"
                      dataKey="newRating"
                      stroke={accentColor}
                      strokeWidth={2.5}
                      dot={ratingData.length < 50}
                      activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-accent-primary)" }}
                      isAnimationActive={!prefersReducedMotion}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        )}

        {/* ── GitHub Contribution Heatmap ── */}
        <div className="mt-8">
          <div className="bg-card border border-border p-6 rounded hover:border-accent-primary/40 transition-colors flex flex-col justify-between items-center w-full relative">
            <div className="flex items-center justify-between w-full mb-6 flex-wrap gap-4">
              <div>
                <h4 className="font-poppins text-xs font-bold text-text-main uppercase tracking-wider">GitHub Contributions</h4>
                <p className="font-mono text-[9px] text-text-muted uppercase tracking-widest mt-1">Live Contribution Heatmap</p>
              </div>
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] text-accent-primary hover:text-accent-secondary uppercase tracking-widest flex items-center gap-1 transition-colors"
              >
                GitHub Profile <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {githubLoading ? (
              <HeatmapSkeleton />
            ) : githubError ? (
              <div className="text-center py-8 flex flex-col items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-accent-primary mb-3 animate-bounce" />
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-4">
                  Heatmap stats offline — check profile directly
                </p>
                <a
                  href={`https://github.com/${githubUsername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-accent-primary/10 text-accent-primary border border-accent-primary/30 rounded text-[10px] font-mono tracking-widest uppercase hover:bg-accent-primary hover:text-background hover-glow transition-all duration-300"
                >
                  Open GitHub
                </a>
              </div>
            ) : (
              <div className="w-full overflow-x-auto flex justify-center py-2 text-text-main font-mono text-[10px]">
                <GitHubCalendar
                  username={githubUsername}
                  theme={calendarTheme}
                  colorScheme={isDark ? "dark" : "light"}
                  labels={{
                    totalCount: "{{count}} contributions in the last year",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
