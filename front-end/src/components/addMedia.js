import React from 'react';

export default () => (
  <svg width="205px" height="142px" viewBox="0 0 205 142" version="1.1">
    <title>Group 2</title>
    <desc>Created with Sketch.</desc>
    <defs>
      <rect id="path-1" x="26.3853892" y="26.7077197" width="150" height="100" rx="5" />
      <rect id="path-2" x="45.3853892" y="27.7077197" width="150" height="100" rx="5" />
      <filter x="-5.3%" y="-5.2%" width="113.2%" height="113.0%" filterUnits="objectBoundingBox" id="filter-3">
        <feOffset dx="1" dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
        <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
        <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0" type="matrix" in="shadowBlurOuter1" result="shadowMatrixOuter1" />
        <feMerge>
          <feMergeNode in="shadowMatrixOuter1" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Group-2" transform="translate(2.000000, 2.000000)">
        <g id="Rectangle-Copy" transform="translate(101.385389, 76.707720) rotate(-11.000000) translate(-101.385389, -76.707720) ">
          <use fill="#D8D8D8" fillRule="evenodd" xlinkHref="#path-1" />
          <rect stroke="#979797" strokeWidth="8" x="30.3853892" y="30.7077197" width="142" height="92" rx="5" />
        </g>
        <g id="Rectangle" transform="translate(120.385389, 77.707720) rotate(10.000000) translate(-120.385389, -77.707720) ">
          <use fill="#D8D8D8" fillRule="evenodd" xlinkHref="#path-2" />
          <rect stroke="#979797" strokeWidth="8" x="49.3853892" y="31.7077197" width="142" height="92" rx="5" />
        </g>
        <circle id="Oval" fill="#8A8A88" cx="80.5" cy="51.5" r="12.5" />
        <path d="M63.9375,99.4296875 C73.84375,87.6041667 83.34375,81.6914062 92.4375,81.6914062 C101.53125,81.6914062 110.509115,81.6914062 119.371094,81.6914062 L144.171875,51.9726562 L153.074219,89.7109375 L168.085937,75.796875 L171.317797,107.638547 L172.585938,120.132812 L63.9375,99.4296875 Z" id="Path-2" fill="#AAAAAA" />
        <g id="Group" filter="url(#filter-3)" opacity="0.799705616" fill="#FFFFFF">
          <rect id="Rectangle-2" x="0" y="28" width="76" height="21" />
          <rect id="Rectangle-2-Copy" transform="translate(38.000000, 38.500000) rotate(90.000000) translate(-38.000000, -38.500000) " x="0" y="28" width="76" height="21" />
        </g>
      </g>
    </g>
  </svg>
);
