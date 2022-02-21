import React from 'react'

/* By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL */
const Loader = (props) => {
     const scale = props.scale || 1;
     const unit = 45*scale;
     const dur = props.duration || 2;
     return (
          <svg
               width={unit}
               height={unit}
               viewBox={`0 0 ${unit} ${unit}`}
               preserveAspectRatio="xMinYMin slice"
               xmlns="http://www.w3.org/2000/svg"
               stroke={props.stroke || "#fff"}
          >
               <g fill="none" fillRule="evenodd" transform="translate(1 1)" strokeWidth="2">
                    <circle cx={unit/2} cy={unit/2} r={unit*0.15} strokeOpacity="0">
                         <animate attributeName="r"
                              begin={`${dur/2}s`} dur={`${dur}s`}
                              values={`${unit*0.15};${unit/2}`}
                              calcMode="linear"
                              repeatCount="indefinite" />
                         <animate attributeName="stroke-opacity"
                              begin={`${dur/2}s`} dur={`${dur}s`}
                              values="1;0" calcMode="linear"
                              repeatCount="indefinite" />
                         <animate attributeName="strokeWidth"
                              begin={`${dur/2}s`} dur={`${dur}s`}
                              values="2;0" calcMode="linear"
                              repeatCount="indefinite" />
                    </circle>
                    <circle cx={unit/2} cy={unit/2} r={unit*0.15} strokeOpacity="0">
                         <animate attributeName="r"
                              begin={`${dur}s`} dur={`${dur}s`}
                              values={`${unit*0.15};${unit/2}`}
                              calcMode="linear"
                              repeatCount="indefinite" />
                         <animate attributeName="stroke-opacity"
                              begin={`${dur}s`} dur={`${dur}s`}
                              values="1;0" calcMode="linear"
                              repeatCount="indefinite" />
                         <animate attributeName="strokeWidth"
                              begin={`${dur}s`} dur={`${dur}s`}
                              values="2;0" calcMode="linear"
                              repeatCount="indefinite" />
                    </circle>
                    <circle cx={unit/2} cy={unit/2} r="8">
                         <animate attributeName="r"
                              begin="0s" dur={`${dur/2}s`}
                              values="6;1;2;3;4;5;6"
                              calcMode="linear"
                              repeatCount="indefinite" />
                    </circle>
               </g>
          </svg>
     );
}
export default Loader;