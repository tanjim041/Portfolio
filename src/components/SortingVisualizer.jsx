import { useState, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw, Zap } from "lucide-react";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [sorting, setSorting] = useState(false);
  const [comparedIndices, setComparedIndices] = useState([]);
  const [swappedIndices, setSwappedIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState(new Set());
  const [speed, setSpeed] = useState(80); // Speed in ms

  const activeRef = useRef(true);
  const speedRef = useRef(speed);

  // Sync speed reference for active loops
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const generateArray = useCallback(() => {
    // Stop any active sorting loop
    activeRef.current = false;
    setSorting(false);
    setComparedIndices([]);
    setSwappedIndices([]);
    setSortedIndices(new Set());

    // Generate 22 random integers (perfect layout count for responsive viewports)
    const newArray = [];
    for (let i = 0; i < 22; i++) {
      newArray.push(Math.floor(Math.random() * 80) + 15);
    }
    setArray(newArray);
  }, []);

  useEffect(() => {
    generateArray();
    return () => {
      activeRef.current = false;
    };
  }, [generateArray]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Bubble Sort algorithm loop
  const runBubbleSort = async () => {
    activeRef.current = true;
    setSorting(true);
    const arr = [...array];
    const n = arr.length;
    const sorted = new Set();

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!activeRef.current) return;
        setComparedIndices([j, j + 1]);
        await sleep(speedRef.current);

        if (arr[j] > arr[j + 1]) {
          setSwappedIndices([j, j + 1]);
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          await sleep(speedRef.current);
          setSwappedIndices([]);
        }
        setComparedIndices([]);
      }
      sorted.add(n - i - 1);
      setSortedIndices(new Set(sorted));
    }
    sorted.add(0);
    setSortedIndices(new Set(sorted));
    setSorting(false);
  };

  // Quick Sort helper recursion
  const runQuickSort = async () => {
    activeRef.current = true;
    setSorting(true);
    const arr = [...array];
    const sorted = new Set();
    
    try {
      await quickSortHelper(arr, 0, arr.length - 1, sorted);
      
      // Mark everything as sorted at the end
      if (activeRef.current) {
        for (let i = 0; i < arr.length; i++) {
          sorted.add(i);
        }
        setSortedIndices(new Set(sorted));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSorting(false);
      setComparedIndices([]);
      setSwappedIndices([]);
    }
  };

  const quickSortHelper = async (arr, start, end, sorted) => {
    if (start >= end) {
      if (start === end && activeRef.current) {
        sorted.add(start);
        setSortedIndices(new Set(sorted));
      }
      return;
    }
    if (!activeRef.current) return;

    const pivotIdx = await partition(arr, start, end, sorted);
    await quickSortHelper(arr, start, pivotIdx - 1, sorted);
    await quickSortHelper(arr, pivotIdx + 1, end, sorted);
  };

  const partition = async (arr, start, end, sorted) => {
    const pivotVal = arr[end];
    let pivotIdx = start;

    for (let i = start; i < end; i++) {
      if (!activeRef.current) throw new Error("Canceled");
      setComparedIndices([i, end]);
      await sleep(speedRef.current);

      if (arr[i] < pivotVal) {
        setSwappedIndices([i, pivotIdx]);
        const temp = arr[i];
        arr[i] = arr[pivotIdx];
        arr[pivotIdx] = temp;
        setArray([...arr]);
        await sleep(speedRef.current);
        setSwappedIndices([]);
        pivotIdx++;
      }
      setComparedIndices([]);
    }

    if (!activeRef.current) throw new Error("Canceled");
    setSwappedIndices([pivotIdx, end]);
    const temp = arr[pivotIdx];
    arr[pivotIdx] = arr[end];
    arr[end] = temp;
    setArray([...arr]);
    await sleep(speedRef.current);
    setSwappedIndices([]);

    sorted.add(pivotIdx);
    setSortedIndices(new Set(sorted));
    return pivotIdx;
  };

  const getBarColorClass = (idx) => {
    if (swappedIndices.includes(idx)) return "bg-text-main"; // Active swap color
    if (comparedIndices.includes(idx)) return "bg-accent-primary"; // Compare color
    if (sortedIndices.has(idx)) return "bg-success-primary"; // Sorted success color
    return "bg-accent-primary/20 border border-accent-primary/30"; // Idle bar color
  };

  return (
    <div className="flex flex-col h-full justify-between select-none">
      {/* Visual Canvas */}
      <div className="h-32 flex items-end justify-center gap-1.5 px-4 pt-4 border-b border-border/40 relative">
        {array.map((val, idx) => (
          <div
            key={idx}
            className={`w-3 sm:w-4 rounded-t-sm transition-all duration-150 ${getBarColorClass(idx)}`}
            style={{ height: `${val}%` }}
          />
        ))}
      </div>

      {/* Control panel toolbar */}
      <div className="p-3 bg-secondary/20 flex items-center justify-between flex-wrap gap-2.5">
        {/* Play actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={runBubbleSort}
            disabled={sorting}
            className="flex items-center gap-1 px-3 py-1.5 bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-background border border-accent-primary/30 rounded font-mono text-[9px] uppercase tracking-wider transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <Play className="w-3 h-3" /> Bubble
          </button>
          <button
            onClick={runQuickSort}
            disabled={sorting}
            className="flex items-center gap-1 px-3 py-1.5 bg-accent-primary/10 text-accent-primary hover:bg-accent-primary hover:text-background border border-accent-primary/30 rounded font-mono text-[9px] uppercase tracking-wider transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
          >
            <Play className="w-3 h-3" /> Quick
          </button>
          <button
            onClick={generateArray}
            className="p-1.5 text-text-muted hover:text-accent-primary hover:bg-secondary/40 rounded transition-all cursor-pointer"
            aria-label="Randomize array"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Segmented Toggle (Touch friendly) */}
        <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase text-text-muted">
          <span>Speed:</span>
          <div className="inline-flex rounded border border-border overflow-hidden">
            {[
              { label: "1x", val: 180 },
              { label: "2x", val: 80 },
              { label: "3x", val: 20 },
            ].map((sp) => (
              <button
                key={sp.label}
                disabled={sorting}
                onClick={() => setSpeed(sp.val)}
                className={`px-2.5 py-1 text-[9px] border-r last:border-r-0 border-border transition-colors font-bold cursor-pointer ${
                  speed === sp.val
                    ? "bg-accent-primary text-background"
                    : "bg-secondary/35 text-text-muted hover:bg-secondary/60 hover:text-text-main"
                }`}
              >
                {sp.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
