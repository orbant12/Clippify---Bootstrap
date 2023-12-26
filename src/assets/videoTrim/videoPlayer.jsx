

const OutputVideo = ({ videoSrc }) => {
  return videoSrc ? (
    <>
      <article className="grid_txt_2">
        <div className="bord_g_2 p_2">
          <video crossOrigin="anonymus" src={videoSrc} autoPlay controls muted ></video>
        </div>
      </article>
       
    </>
  ) : null;
};
  
  export default OutputVideo;



  