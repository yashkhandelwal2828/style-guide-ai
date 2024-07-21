import * as React from "react";
const LoadingResult = () => (
<svg width="60" height="15" viewBox="0 0 60 15" xmlns="http://www.w3.org/2000/svg" fill="#00D1FF">
  <circle cx="7.5" cy="7.5" r="5">
    <animate attributeName="r" from="5" to="5" begin="0s" dur="0.8s" values="5;2.5;5" calcMode="linear" repeatCount="indefinite" />
    <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
  </circle>
  <circle cx="30" cy="7.5" r="5" fill-opacity="0.3">
    <animate attributeName="r" from="5" to="5" begin="0s" dur="0.8s" values="2.5;5;2.5" calcMode="linear" repeatCount="indefinite" />
    <animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite" />
  </circle>
  <circle cx="52.5" cy="7.5" r="5">
    <animate attributeName="r" from="5" to="5" begin="0s" dur="0.8s" values="5;2.5;5" calcMode="linear" repeatCount="indefinite" />
    <animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
  </circle>
</svg>


);
export default LoadingResult;
