<template>
  <div class="clouds">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="762px"
      height="331px"
      viewBox="0 0 762 331"
      enable-background="new 0 0 762 331"
      xml:space="preserve"
      class="cloud big front slowest"
    >
      <path
        fill="#FFFFFF"
        d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
      />
    </svg>
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="762px"
      height="331px"
      viewBox="0 0 762 331"
      enable-background="new 0 0 762 331"
      xml:space="preserve"
      class="cloud distant smaller"
    >
      <path
        fill="#FFFFFF"
        d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
      />
    </svg>

    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="762px"
      height="331px"
      viewBox="0 0 762 331"
      enable-background="new 0 0 762 331"
      xml:space="preserve"
      class="cloud small slow"
    >
      <path
        fill="#FFFFFF"
        d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
      />
    </svg>

    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="762px"
      height="331px"
      viewBox="0 0 762 331"
      enable-background="new 0 0 762 331"
      xml:space="preserve"
      class="cloud distant super-slow massive"
    >
      <path
        fill="#FFFFFF"
        d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
      />
    </svg>

    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="762px"
      height="331px"
      viewBox="0 0 762 331"
      enable-background="new 0 0 762 331"
      xml:space="preserve"
      class="cloud slower"
    >
      <path
        fill="#FFFFFF"
        d="M715.394,228h-16.595c0.79-5.219,1.201-10.562,1.201-16c0-58.542-47.458-106-106-106
c-8.198,0-16.178,0.932-23.841,2.693C548.279,45.434,488.199,0,417.5,0c-84.827,0-154.374,65.401-160.98,148.529
C245.15,143.684,232.639,141,219.5,141c-49.667,0-90.381,38.315-94.204,87H46.607C20.866,228,0,251.058,0,279.5
S20.866,331,46.607,331h668.787C741.133,331,762,307.942,762,279.5S741.133,228,715.394,228z"
      />
    </svg>
  </div>
</template>

<style>
/**
 * Clouds
 */
.clouds {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  transform: translateZ(0);
  height: 100vh;
  z-index: 0;
}

.cloud {
  position: absolute;
  top: 20%;
  width: 300px;
  right: 0;
  opacity: 1;
}

.cloud.front {
  z-index: 0;
}

.cloud.distant {
  z-index: 0;
}

.cloud.background {
  z-index: 0;
}

/*Cloud Sizing*/
.cloud.smaller {
  margin-right: 400px;
  width: 100px;
  margin-top: 150px;
}

.cloud.small {
  margin-right: 200px;
  width: 150px;
}

.cloud.big {
  width: 500px;
  margin-top: 250px;
  margin-right: 150px;
}

.cloud.massive {
  width: 600px;
  margin-top: 320px;
  margin-right: 0px;
}

/*Cloud: Animation*/
.cloud {
  -webkit-animation-name: cloud-movement;
  -webkit-animation-timing-function: linear;
  -webkit-animation-direction: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-duration: 8s;

  -moz-animation-name: cloud-movement;
  -moz-animation-timing-function: linear;
  -moz-animation-direction: forwards;
  -moz-animation-iteration-count: infinite;
  -moz-animation-duration: 8s;

  animation-name: cloud-movement;
  animation-timing-function: linear;
  animation-direction: forwards;
  animation-iteration-count: infinite;
  animation-duration: 8s;
}

.slow {
  -webkit-animation-duration: 9.2s;
  -moz-animation-duration: 9.2s;
  animation-duration: 9.2s;
}

.slower {
  -webkit-animation-duration: 11.2s;
  -moz-animation-duration: 11.2s;
  animation-duration: 11.2s;
}

.slowest {
  -webkit-animation-duration: 13.5s;
  -moz-animation-duration: 13.5s;
  animation-duration: 13.5s;
}

.super-slow {
  -webkit-animation-duration: 20.5s;
  -moz-animation-duration: 20.5s;
  animation-duration: 20.5s;
}

@keyframes cloud-movement {
  0% {
    opacity: 0.1;
    -webkit-transform: translateX(300px);
    -moz-transform: translateX(300px);
    transform: translateX(300px);
  }
  10% {
    opacity: 0.7;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(-1000px);
    -moz-transform: translateX(-1000px);
    transform: translateX(-1000px);
  }
}
</style>
