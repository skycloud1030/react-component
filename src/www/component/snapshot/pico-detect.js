import React, { useRef, useEffect } from "react";
import pico from "../../../components/pico/pico.js";
import lploc from "../../../components/pico/lploc.js";
import { rgba_to_grayscale } from "../../../components/pico/utility/index.js";

function Pico(props) {
  const { video, score = 100 } = props;
  const ctx_ref = useRef(null);
  const score_ref = useRef(score);

  useEffect(() => {
    score_ref.current = score;
  }, [score]);

  useEffect(() => {
    if (video) {
      let cancel = false;
      const ctx = ctx_ref.current.getContext("2d");
      const update_memory = pico.instantiate_detection_memory(5);
      const fetch_puploc = fetch("./data/puploc.bin")
        .then(response => response.arrayBuffer())
        .then(buffer => lploc.unpack_localizer(new Int8Array(buffer)));
      const fetch_face = fetch("./data/facefinder")
        .then(response => response.arrayBuffer())
        .then(buffer => pico.unpack_cascade(new Int8Array(buffer)));

      let params = {
        shiftfactor: 0.1, // move the detection window by 10% of its size
        minsize: 100, // minimum size of a face
        maxsize: 1000, // maximum size of a face
        scalefactor: 1.1 // for multiscale processing: resize the detection window by 10% when moving to the higher scale
      };

      Promise.all([fetch_face, fetch_puploc]).then(
        ([facefinder_classify_region, do_puploc]) => {
          function getVideoFrame() {
            if (cancel) {
              return;
            }
            ctx.drawImage(video, 0, 0);
            const rgba = ctx.getImageData(0, 0, 640, 480).data;
            let image = {
              pixels: rgba_to_grayscale(rgba, 480, 640),
              nrows: 480,
              ncols: 640,
              ldim: 640
            };
            let dets = pico.run_cascade(
              image,
              facefinder_classify_region,
              params
            );
            dets = update_memory(dets);
            dets = pico.cluster_detections(dets, 0.2); // set IoU threshold to 0.2

            for (let i = 0; i < dets.length; ++i) {
              if (dets[i][3] > score_ref.current) {
                ctx.beginPath();
                ctx.arc(
                  dets[i][1],
                  dets[i][0],
                  dets[i][2] / 2,
                  0,
                  2 * Math.PI,
                  false
                );
                ctx.lineWidth = 3;
                ctx.strokeStyle = "red";
                ctx.stroke();

                let r = dets[i][0] - 0.075 * dets[i][2];
                let c = dets[i][1] - 0.175 * dets[i][2];
                let s = 0.35 * dets[i][2];
                [r, c] = do_puploc(r, c, s, 63, image);
                if (r >= 0 && c >= 0) {
                  ctx.beginPath();
                  ctx.arc(c, r, 1, 0, 2 * Math.PI, false);
                  ctx.lineWidth = 3;
                  ctx.strokeStyle = "red";
                  ctx.stroke();
                }

                r = dets[i][0] - 0.075 * dets[i][2];
                c = dets[i][1] + 0.175 * dets[i][2];
                s = 0.35 * dets[i][2];
                [r, c] = do_puploc(r, c, s, 63, image);
                if (r >= 0 && c >= 0) {
                  ctx.beginPath();
                  ctx.arc(c, r, 1, 0, 2 * Math.PI, false);
                  ctx.lineWidth = 3;
                  ctx.strokeStyle = "red";
                  ctx.stroke();
                }
              }
            }
            requestAnimationFrame(() => getVideoFrame());
          }
          getVideoFrame();
        }
      );

      return () => {
        cancel = true;
      };
    }
  }, [video]);

  return <canvas width={640} height={480} ref={ctx_ref} />;
}

export default React.memo(Pico);
