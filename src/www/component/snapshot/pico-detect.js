import React, { useRef, useEffect } from "react";
import pico from "../../../components/pico/pico.js";
import lploc from "../../../components/pico/lploc.js";
import camvas from "../../../components/pico/camvas.js";
import { rgba_to_grayscale } from "../../../components/pico/utility/index.js";
import { canvas_to_image } from "../../../components/pico/utility/index.js";

function PicoDetect(props) {
  const { score = 600, onSnapshot = () => {} } = props;
  const score_ref = useRef(score);
  const ctx_ref = useRef(null);

  useEffect(() => {
    score_ref.current = score;
  }, [score]);

  useEffect(() => {
    const ctx = ctx_ref.current.getContext("2d");
    let update_memory = pico.instantiate_detection_memory(5); // we will use the detecions of the last 5 frames

    const fetch_puploc = fetch("./data/puploc.bin")
      .then(response => response.arrayBuffer())
      .then(buffer => lploc.unpack_localizer(new Int8Array(buffer)));
    const fetch_face = fetch("./data/facefinder")
      .then(response => response.arrayBuffer())
      .then(buffer => pico.unpack_cascade(new Int8Array(buffer)));

    Promise.all([fetch_face, fetch_puploc]).then(
      ([facefinder_classify_region, do_puploc]) => {
        const processfn = function(video, dt) {
          // render the video frame to the canvas element and extract RGBA pixel data
          ctx.drawImage(video, 0, 0);
          const rgba = ctx.getImageData(0, 0, 640, 480).data;
          // prepare input to `run_cascade`
          let image = {
            pixels: rgba_to_grayscale(rgba, 480, 640),
            nrows: 480,
            ncols: 640,
            ldim: 640
          };
          let params = {
            shiftfactor: 0.1, // move the detection window by 10% of its size
            minsize: 100, // minimum size of a face
            maxsize: 1000, // maximum size of a face
            scalefactor: 1.1 // for multiscale processing: resize the detection window by 10% when moving to the higher scale
          };
          // run the cascade over the frame and cluster the obtained detections
          // dets is an array that contains (r, c, s, q) quadruplets
          // (representing row, column, scale and detection score)
          let dets = pico.run_cascade(
            image,
            facefinder_classify_region,
            params
          );
          dets = update_memory(dets);
          dets = pico.cluster_detections(dets, 0.2); // set IoU threshold to 0.2
          // draw detections
          for (let i = 0; i < dets.length; ++i)
            // check the detection score
            // if it's above the threshold, draw it
            // (the constant 50.0 is empirical: other cascades might require a different one)
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
              //
              // find the eye pupils for each detected face
              // starting regions for localization are initialized based on the face bounding box
              // (parameters are set empirically)
              // first eye
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
              // second eye
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

              if (r >= 0 && c >= 0) {
                // marke snapshot
                const snap = canvas_to_image(ctx.canvas);
                onSnapshot(snap, dets[i][3]);
              }
            }
        };

        new camvas(ctx, processfn);
      }
    );
    // fetch("./data/facefinder").then(function(response) {
    //   response.arrayBuffer().then(function(buffer) {

    //   });
    // });
  }, []);
  return <canvas width={640} height={480} ref={ctx_ref} />;
}

export default PicoDetect;
