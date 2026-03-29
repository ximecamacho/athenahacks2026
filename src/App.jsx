import './index.css'

export default function App() {
    return (<div style={{
      width: '1912px',
      height: '982px',
      position: 'relative',
      background: '#BA1B18',
      overflow: 'hidden',
      transform: `scale(${Math.min(window.innerWidth / 1512, window.innerHeight / 982)})`,
      transformOrigin: 'top left'
    }}>
      <div style={{left: 928, top: 225, position: 'absolute', color: '#3D1A12', fontSize: 45, fontFamily: 'Chelsea Market', fontWeight: '400', lineHeight: 'normal', letterSpacing: 0.50, wordWrap: 'break-word'}}>Lady Asian Beetles </div>
      <div style={{left: 301, top: 208, position: 'absolute', color: '#3D1A12', fontSize: 45, fontFamily: 'Chelsea Market', fontWeight: '400', lineHeight: 'normal', letterSpacing: 0.50, wordWrap: 'break-word'}}>Lady Bug </div>
     
      <div style={{width: 100, height: 100, left: 393, top: 586, position: 'absolute'}} />
      <div style={{width: 1512, height: 168, left: 0, top: 0, position: 'absolute', overflow: 'hidden'}}>
          <div style={{left: 585, top: 42, position: 'absolute', color: '#3D1A12', fontSize: 50, fontFamily: 'Chelsea Market', fontWeight: '400', lineHeight: 'normal', letterSpacing: 0.50, wordWrap: 'break-word'}}>Code Prompt</div>
          <div style={{left: 363, top: 113, position: 'absolute', color: '#E2D37A', fontSize: 50, fontFamily: 'Chelsea Market', fontWeight: '400', lineHeight: 'normal', letterSpacing: 0.50, wordWrap: 'break-word'}}>Type the output: “Hello World”</div>
      </div>

      <svg width="200" height="200" viewBox="0 0 200 200" style={{ position: 'absolute', left: '49px' }}>
  
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="631" height="658" viewBox="0 0 631 658" fill="none">
  <path d="M631 414.521C631 577.136 455.856 753.375 315.5 597.656C193.739 735.281 0 577.136 0 414.521C0 251.905 185.941 117.46 315.5 1.36752e-05C449.258 116.241 631 251.905 631 414.521Z" fill="#526022"/>
</svg>
<svg xmlns="http://www.w3.org/2000/svg" width="631" height="658" viewBox="0 0 631 658" fill="none">
  <path d="M631 243.479C631 80.8636 455.856 -95.3753 315.5 60.3442C193.739 -77.2811 0 80.8636 0 243.479C0 406.095 185.941 540.54 315.5 658C449.258 541.759 631 406.095 631 243.479Z" fill="#526022"/>
</svg>
      
  </div>
  
);
  
  }