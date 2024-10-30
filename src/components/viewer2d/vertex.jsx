import React from "react";
import PropTypes from "prop-types";
import * as SharedStyle from "../../shared-style";
const STYLE = {
  fill: "linear-gradient(346.44deg, #C3962E 19.57%, #4E2F05 22.07%, #996D1D 30.41%, #D09B2F 37.91%, #F2B73A 42.91%, #FFC23F 46.24%, #B07520 57.08%, #FFFFFF 64.58%, #BF9700 73.74%, #F0DFAC 87.08%, #E7D18B 87.91%, #D8BC5A 88.74%, #D4B549 89.58%, #D0B03D 90.41%, #CEAD36 91.24%, #CEAD35 94.58%, #FFC23F 102.91%)",

  stroke: SharedStyle.COLORS.white,
  cursor: "move",
};

export default function Vertex({ vertex, layer }) {
  let { x, y } = vertex;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      data-element-root
      data-prototype={vertex.prototype}
      data-id={vertex.id}
      data-selected={vertex.selected}
      data-layer={layer.id}
    >
      <svg width="30" height="30" viewBox="-30 -30 60 60">
        <defs>
          <linearGradient id="goldGradient" gradientTransform="rotate(346.44)">
            <stop offset="19.57%" stop-color="#C3962E" />
            <stop offset="22.07%" stop-color="#4E2F05" />
            <stop offset="30.41%" stop-color="#996D1D" />
            <stop offset="37.91%" stop-color="#D09B2F" />
            <stop offset="42.91%" stop-color="#F2B73A" />
            <stop offset="46.24%" stop-color="#FFC23F" />
            <stop offset="57.08%" stop-color="#B07520" />
            <stop offset="64.58%" stop-color="#FFFFFF" />
            <stop offset="73.74%" stop-color="#BF9700" />
            <stop offset="87.08%" stop-color="#F0DFAC" />
            <stop offset="87.91%" stop-color="#E7D18B" />
            <stop offset="88.74%" stop-color="#D8BC5A" />
            <stop offset="89.58%" stop-color="#D4B549" />
            <stop offset="90.41%" stop-color="#D0B03D" />
            <stop offset="91.24%" stop-color="#CEAD36" />
            <stop offset="94.58%" stop-color="#CEAD35" />
            <stop offset="102.91%" stop-color="#FFC23F" />
          </linearGradient>

          <linearGradient id="brownGradient" gradientTransform="rotate(100)">
            <stop offset="0%" stop-color="rgba(92, 61, 43, 0.83)" />
            <stop offset="100%" stop-color="rgba(51, 31, 21, 0.83)" />
          </linearGradient>
        </defs>
      </svg>
      <circle
        cx="0"
        cy="0"
        r="14"
        fill="url(#brownGradient)"
        stroke="url(#goldGradient)"
        stroke-width="2"
      />
      <path d="M0,-12 L4,-4 L0,-8 L-4,-4 Z" fill="url(#goldGradient)" />{" "}
      {/* Mũi tên trên */}
      <path d="M0,12 L4,4 L0,8 L-4,4 Z" fill="url(#goldGradient)" />{" "}
      {/* Mũi tên dưới */}
      <path d="M-12,0 L-4,-4 L-8,0 L-4,4 Z" fill="url(#goldGradient)" />{" "}
      {/* Mũi tên trái */}
      <path d="M12,0 L4,-4 L8,0 L4,4 Z" fill="url(#goldGradient)" />{" "}
      {/* Mũi tên phải */}
    </g>
  );
}

Vertex.propTypes = {
  vertex: PropTypes.object.isRequired,
  layer: PropTypes.object.isRequired,
};
