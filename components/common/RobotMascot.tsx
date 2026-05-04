"use client";

import { useEffect, useRef, useState } from "react";

const BLINK_MIN_INTERVAL_MS = 3500;
const BLINK_MAX_INTERVAL_MS = 7500;
const BLINK_DURATION_MS = 140;
const STRAIGHT_DURATION_MS = 600;

const FILL_WHITE = "#fff";
const FILL_GRAY_LIGHT = "#cccdce";
const FILL_BLUE = "#057df4";
const FILL_GRAY = "#a7a7a8";

function RobotCurved({ blinking }: { blinking: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 185.54 135.65"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={FILL_WHITE}
        d="M92.73,130.65c-25.43-.36-44.45-2.26-54.67-10.34l-.09-.07c-10.54-7.65-13-21.36-13.46-41v-.15C25,59.48,27.42,45.77,38,38.08L38.1,38c10.18-8,29.21-9.94,54.63-10.3,25.51.36,44.54,2.26,54.76,10.34l.08.06c10.55,7.65,13,21.36,13.47,41v.15c-.49,19.63-2.92,33.34-13.52,41l-.08.06c-10.18,8-29.21,9.94-54.63,10.3h-.08Z"
      />
      <path
        fill={FILL_GRAY_LIGHT}
        d="M47.37,7.12A11.6,11.6,0,0,0,33.32.51a11.49,11.49,0,0,0-8,11.82,7.08,7.08,0,0,1-1.81,5.21C11.67,30.87,10.11,47.22,10.21,55.63a3.94,3.94,0,0,1-2,3.48A16,16,0,0,0,0,73.06V85.31a16,16,0,0,0,10.74,15.11L23,104.68v-51l-2.09.73a2,2,0,0,1-2.66-2c.31-7,2.09-17.59,9.08-27a7.12,7.12,0,0,1,7.14-2.71A11.5,11.5,0,0,0,47.37,7.12Z"
      />
      <path
        fill={FILL_GRAY_LIGHT}
        d="M175.33,55.63c.1-8.4-1.47-24.76-13.26-38.09a7.08,7.08,0,0,1-1.81-5.21,11.49,11.49,0,0,0-8-11.82,11.6,11.6,0,0,0-14.05,6.61,11.5,11.5,0,0,0,12.9,15.64,7.12,7.12,0,0,1,7.14,2.71c7,9.37,8.78,20,9.08,27a2,2,0,0,1-2.66,2l-2.09-.73v51l12.26-4.26a16,16,0,0,0,10.74-15.11V73.06a16,16,0,0,0-8.19-14A3.94,3.94,0,0,1,175.33,55.63Z"
      />
      <path
        fill={FILL_BLUE}
        d="M122.77,49.69A29.27,29.27,0,0,0,97.54,63.9l-4.78,7.7L88,63.92a29.49,29.49,0,1,0,0,30.55l4.78-7.7,4.75,7.66a29.5,29.5,0,1,0,25.25-44.74Zm-41.6,40.6a21.49,21.49,0,1,1,0-22.21l6.89,11.1Zm41.6,10.39a21.37,21.37,0,0,1-18.43-10.43L97.48,79.18l6.89-11.1a21.5,21.5,0,1,1,18.41,32.6Z"
      />
      <path d="M166,79.08c-.41-16.6-2-35.12-15.52-45-11.38-8.94-30.52-11-57.7-11.36h-.11C65.53,23.1,46.39,25.14,35,34.08,21.48,44,19.91,62.49,19.5,79.08v.2c.41,16.6,2,35.12,15.52,45,11.38,8.94,30.52,11,57.7,11.37h.11c27.18-.38,46.32-2.42,57.7-11.37,13.54-9.88,15.11-28.41,15.52-45v-.2Zm-20.28,38.78-.13.1c-9.55,7.55-28,9.34-52.86,9.69C68,127.3,49.47,125.51,39.91,118l-.13-.1c-9.59-7-11.81-20-12.28-38.68C28,60.47,30.19,47.46,39.78,40.51l.13-.1c9.55-7.55,28-9.34,52.86-9.69,24.82.35,43.3,2.14,52.86,9.69l.13.1c9.59,7,11.81,20,12.28,38.68C157.57,97.9,155.34,110.9,145.75,117.86Z" />
      <path
        fill={FILL_BLUE}
        d="M103,109.35H82.53a2.71,2.71,0,0,0-2.59,3.44,13.28,13.28,0,0,0,25.64,0A2.71,2.71,0,0,0,103,109.35Z"
      />
      {blinking ? (
        <g>
          <path
            fill={FILL_GRAY}
            d="M73.67,84.5a4,4,0,0,1-1.82-.44,19.8,19.8,0,0,0-18.07,0,4,4,0,0,1-3.65-7.12,27.81,27.81,0,0,1,25.38,0,4,4,0,0,1-1.83,7.56Z"
          />
          <path
            fill={FILL_GRAY}
            d="M111.87,84.5A4,4,0,0,1,110,76.94a27.9,27.9,0,0,1,12.69-3.07,27.53,27.53,0,0,1,12.69,3.06,4,4,0,0,1-3.65,7.12,19.8,19.8,0,0,0-18.07,0A4,4,0,0,1,111.87,84.5Z"
          />
        </g>
      ) : (
        <g>
          <circle fill={FILL_GRAY} cx="62.81" cy="79.18" r="11.5" />
          <circle fill={FILL_GRAY} cx="122.73" cy="79.18" r="11.5" />
        </g>
      )}
    </svg>
  );
}

function RobotStraight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -8.71 185.54 135.65"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill={FILL_WHITE}
        d="M92.73,121.94c-25.42-.36-44.45-2.26-54.67-10.34l-.09-.07c-10.54-7.65-13-21.36-13.46-41v-.15C25,50.76,27.42,37.05,38,29.36l.08-.06c10.18-8,29.21-9.94,54.63-10.3,25.51.36,44.54,2.26,54.76,10.34l.08.06c10.55,7.65,13,21.36,13.47,41v.15c-.49,19.63-2.92,33.34-13.52,41l-.08.06c-10.18,8-29.21,9.94-54.63,10.3h-.08Z"
      />
      <path
        fill={FILL_GRAY_LIGHT}
        d="M20.72,20.85a11.46,11.46,0,0,0,4.83-9.24,11.5,11.5,0,1,0-23-.12,11.46,11.46,0,0,0,5,9.46A5.91,5.91,0,0,1,10,25.84V47a4,4,0,0,1-2,3.44A16,16,0,0,0,0,64.34V76.59A16,16,0,0,0,10.74,91.7L23,96V45l-2.29.8A2,2,0,0,1,18,43.88v-18A6.16,6.16,0,0,1,20.72,20.85Z"
      />
      <path
        fill={FILL_GRAY_LIGHT}
        d="M175.49,47V25.84a6.16,6.16,0,0,1,2.67-5A11.46,11.46,0,0,0,183,11.62a11.5,11.5,0,1,0-23-.12A11.46,11.46,0,0,0,165,21a5.91,5.91,0,0,1,2.52,4.88v18a2,2,0,0,1-2.66,1.89l-2.29-.8V96l12.26-4.26a16,16,0,0,0,10.74-15.11V64.34a16,16,0,0,0-8.07-13.89A4,4,0,0,1,175.49,47Z"
      />
      <path
        fill={FILL_BLUE}
        d="M122.77,41A29.27,29.27,0,0,0,97.54,55.19l-4.78,7.7L88,55.2a29.49,29.49,0,1,0,0,30.55l4.78-7.7,4.75,7.66A29.5,29.5,0,1,0,122.77,41Zm-41.6,40.6a21.49,21.49,0,1,1,0-22.21l6.89,11.1ZM122.77,92a21.37,21.37,0,0,1-18.43-10.43L97.48,70.47l6.89-11.1A21.5,21.5,0,1,1,122.77,92Z"
      />
      <path d="M150.52,25.36C139.14,16.42,120,14.38,92.82,14h-.11c-27.18.38-46.32,2.42-57.7,11.37-13.54,9.88-15.11,28.41-15.52,45v.2c.41,16.6,2,35.12,15.52,45,11.38,8.94,30.52,11,57.7,11.37h.11c27.18-.38,46.32-2.42,57.7-11.37,13.54-9.88,15.11-28.41,15.52-45v-.2C165.63,53.77,164.06,35.25,150.52,25.36Zm-4.77,83.78-.13.1c-9.55,7.55-28,9.34-52.86,9.69-24.82-.35-43.3-2.14-52.86-9.69l-.13-.1c-9.59-7-11.81-20-12.28-38.68C28,51.75,30.19,38.75,39.78,31.79l.13-.1c9.56-7.55,28-9.34,52.86-9.69,24.82.35,43.3,2.14,52.86,9.69l.13.1c9.59,7,11.81,20,12.28,38.68C157.57,89.18,155.34,102.18,145.75,109.14Z" />
      <path
        fill={FILL_BLUE}
        d="M103,100.63H82.53a2.71,2.71,0,0,0-2.59,3.44,13.28,13.28,0,0,0,25.64,0A2.71,2.71,0,0,0,103,100.63Z"
      />
      <circle fill={FILL_GRAY} cx="62.81" cy="70.47" r="11.5" />
      <circle fill={FILL_GRAY} cx="122.73" cy="70.47" r="11.5" />
    </svg>
  );
}

export function RobotMascot({ onActivate }: { onActivate: () => void }) {
  const [blinking, setBlinking] = useState(false);
  const [popped, setPopped] = useState(false);
  const blinkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const poppedRef = useRef(false);

  useEffect(() => {
    poppedRef.current = popped;
  }, [popped]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const scheduleNextBlink = () => {
      const delay =
        BLINK_MIN_INTERVAL_MS +
        Math.random() * (BLINK_MAX_INTERVAL_MS - BLINK_MIN_INTERVAL_MS);
      blinkTimerRef.current = setTimeout(() => {
        if (!poppedRef.current) {
          setBlinking(true);
          blinkTimerRef.current = setTimeout(() => {
            setBlinking(false);
            scheduleNextBlink();
          }, BLINK_DURATION_MS);
        } else {
          scheduleNextBlink();
        }
      }, delay);
    };

    scheduleNextBlink();

    return () => {
      if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
      if (popTimerRef.current) clearTimeout(popTimerRef.current);
    };
  }, []);

  const handleClick = () => {
    if (popTimerRef.current) clearTimeout(popTimerRef.current);
    setPopped(true);
    popTimerRef.current = setTimeout(() => {
      setPopped(false);
    }, STRAIGHT_DURATION_MS);
    onActivate();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative mt-6 flex h-16 w-22 cursor-pointer items-center justify-center transition hover:opacity-90"
      aria-label="Open chat - Infinite Robots mascot"
    >
      {popped ? <RobotStraight /> : <RobotCurved blinking={blinking} />}
    </button>
  );
}
