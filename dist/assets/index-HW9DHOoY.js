function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/add-DWAujV_5.js","assets/core-C5J3xCfn.js","assets/index-CDZZ69tS.js","assets/index-DNCbGkxL.css","assets/events-CMKVmDLI.js","assets/index.es-Dh2N-fXW.js","assets/all-wallets-BMF0Aduq.js","assets/arrow-bottom-circle-BZe1QmL6.js","assets/app-store-CQNALj0N.js","assets/apple-C0GwyXif.js","assets/arrow-bottom-Dx19gHOe.js","assets/arrow-left-Cg0Mkyky.js","assets/arrow-right-BK40szvP.js","assets/arrow-top-DkCJh9K7.js","assets/bank-Eugm4q8Y.js","assets/browser-BlRIx-hN.js","assets/card-CIkRw4ub.js","assets/checkmark-BUQyWlJu.js","assets/checkmark-bold-Bq8Cl9Iu.js","assets/chevron-bottom-BVCOOTHE.js","assets/chevron-left-B-I-KYvC.js","assets/chevron-right-AjB1q9ip.js","assets/chevron-top-CivysIbp.js","assets/chrome-store-CEmi_fxZ.js","assets/clock-bss1VWba.js","assets/close-BRsFfXXB.js","assets/compass-3ioAr1H4.js","assets/coinPlaceholder-Et-iRObN.js","assets/copy-Cn5pTndd.js","assets/cursor-CVJR-t-z.js","assets/cursor-transparent-CgVBrawI.js","assets/desktop-Bm9SlX5C.js","assets/disconnect-f5YMwX2L.js","assets/discord-BMDDOKoD.js","assets/etherscan-D_vKc6Wx.js","assets/extension-0Iyro_X6.js","assets/external-link-COCTwcT5.js","assets/facebook-ja-kFO3m.js","assets/farcaster-DfTQ65E2.js","assets/filters-DkzaiAkN.js","assets/github-DISw6sTC.js","assets/google-BrTjHpFk.js","assets/help-circle-Ca3eX8TF.js","assets/image-C_6FAoZ1.js","assets/id-fPok6SY-.js","assets/info-circle-Ba-awc9z.js","assets/lightbulb-D5H35nsH.js","assets/mail-BdwYeJzk.js","assets/mobile-C5N_ueE4.js","assets/more-DLRbHtUp.js","assets/network-placeholder-CWwFVUUC.js","assets/nftPlaceholder-C2HpyqWx.js","assets/off-9wL8aXek.js","assets/play-store-DoBJufBF.js","assets/plus-IOiyHnoB.js","assets/qr-code-BDKkagAb.js","assets/recycle-horizontal-Cpuv7Fh8.js","assets/refresh-Dh-i9YqI.js","assets/search-bLLqh4Ij.js","assets/send-Dltj8Hk4.js","assets/swapHorizontal-CQCvt7a8.js","assets/swapHorizontalMedium-B02Uk6SS.js","assets/swapHorizontalBold-CiZ-uyYK.js","assets/swapHorizontalRoundedBold-C3igdnDp.js","assets/swapVertical-CYLUK89n.js","assets/telegram-BwGXYPsx.js","assets/three-dots-j5zYwmhc.js","assets/twitch-dXhv0u61.js","assets/x-DgmT3JfT.js","assets/twitterIcon-GcD_XKHY.js","assets/verify-B6iAmWEt.js","assets/verify-filled-DNDdNjCP.js","assets/wallet-BI1Ex1Et.js","assets/walletconnect-DiuzpInv.js","assets/wallet-placeholder-DSuDWKVi.js","assets/warning-circle-duXKOAZ-.js","assets/info-BJq4PMcm.js","assets/exclamation-triangle-C5wtRRyb.js","assets/reown-logo-Dzyujtsk.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{J as N,K as q,k as E,l as b,m as $,x as w,L as Y,N as V,o as U,n as K}from"./core-C5J3xCfn.js";import{_ as a}from"./index-CDZZ69tS.js";const f={getSpacingStyles(e,t){if(Array.isArray(e))return e[t]?`var(--wui-spacing-${e[t]})`:void 0;if(typeof e=="string")return`var(--wui-spacing-${e})`},getFormattedDate(e){return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(e)},getHostName(e){try{return new URL(e).hostname}catch{return""}},getTruncateString({string:e,charsStart:t,charsEnd:i,truncate:r}){return e.length<=t+i?e:r==="end"?`${e.substring(0,t)}...`:r==="start"?`...${e.substring(e.length-i)}`:`${e.substring(0,Math.floor(t))}...${e.substring(e.length-Math.floor(i))}`},generateAvatarColors(e){const i=e.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),r=this.hexToRgb(i),n=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),s=100-3*Number(n==null?void 0:n.replace("px","")),c=`${s}% ${s}% at 65% 40%`,u=[];for(let p=0;p<5;p+=1){const g=this.tintColor(r,.15*p);u.push(`rgb(${g[0]}, ${g[1]}, ${g[2]})`)}return`
    --local-color-1: ${u[0]};
    --local-color-2: ${u[1]};
    --local-color-3: ${u[2]};
    --local-color-4: ${u[3]};
    --local-color-5: ${u[4]};
    --local-radial-circle: ${c}
   `},hexToRgb(e){const t=parseInt(e,16),i=t>>16&255,r=t>>8&255,n=t&255;return[i,r,n]},tintColor(e,t){const[i,r,n]=e,o=Math.round(i+(255-i)*t),s=Math.round(r+(255-r)*t),c=Math.round(n+(255-n)*t);return[o,s,c]},isNumber(e){return{number:/^[0-9]+$/u}.number.test(e)},getColorTheme(e){var t;return e||(typeof window<"u"&&window.matchMedia?(t=window.matchMedia("(prefers-color-scheme: dark)"))!=null&&t.matches?"dark":"light":"dark")},splitBalance(e){const t=e.split(".");return t.length===2?[t[0],t[1]]:["0","00"]},roundNumber(e,t,i){return e.toString().length>=t?Number(e).toFixed(i):e},formatNumberToLocalString(e,t=2){return e===void 0?"0.00":typeof e=="number"?e.toLocaleString("en-US",{maximumFractionDigits:t,minimumFractionDigits:t}):parseFloat(e).toLocaleString("en-US",{maximumFractionDigits:t,minimumFractionDigits:t})}};function X(e,t){const{kind:i,elements:r}=t;return{kind:i,elements:r,finisher(n){customElements.get(e)||customElements.define(e,n)}}}function Z(e,t){return customElements.get(e)||customElements.define(e,t),t}function S(e){return function(i){return typeof i=="function"?Z(e,i):X(e,i)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:N},Q=(e=J,t,i)=>{const{kind:r,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(o===void 0&&globalThis.litPropertyMetadata.set(n,o=new Map),r==="setter"&&((e=Object.create(e)).wrapped=!0),o.set(i.name,e),r==="accessor"){const{name:s}=i;return{set(c){const u=t.get.call(this);t.set.call(this,c),this.requestUpdate(s,u,e)},init(c){return c!==void 0&&this.C(s,void 0,e,c),c}}}if(r==="setter"){const{name:s}=i;return function(c){const u=this[s];t.call(this,c),this.requestUpdate(s,u,e)}}throw Error("Unsupported decorator location: "+r)};function l(e){return(t,i)=>typeof i=="object"?Q(e,t,i):((r,n,o)=>{const s=n.hasOwnProperty(o);return n.constructor.createProperty(o,r),s?Object.getOwnPropertyDescriptor(n,o):void 0})(e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function bt(e){return l({...e,state:!0,attribute:!1})}const tt=E`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`;var _=function(e,t,i,r){var n=arguments.length,o=n<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o};let d=class extends ${render(){return this.style.cssText=`
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&f.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&f.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&f.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&f.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&f.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&f.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&f.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&f.getSpacingStyles(this.margin,3)};
    `,w`<slot></slot>`}};d.styles=[b,tt];_([l()],d.prototype,"flexDirection",void 0);_([l()],d.prototype,"flexWrap",void 0);_([l()],d.prototype,"flexBasis",void 0);_([l()],d.prototype,"flexGrow",void 0);_([l()],d.prototype,"flexShrink",void 0);_([l()],d.prototype,"alignItems",void 0);_([l()],d.prototype,"justifyContent",void 0);_([l()],d.prototype,"columnGap",void 0);_([l()],d.prototype,"rowGap",void 0);_([l()],d.prototype,"gap",void 0);_([l()],d.prototype,"padding",void 0);_([l()],d.prototype,"margin",void 0);d=_([S("wui-flex")],d);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const St=e=>e??Y;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const et=e=>e===null||typeof e!="object"&&typeof e!="function",it=e=>e.strings===void 0;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const W={ATTRIBUTE:1,CHILD:2},H=e=>(...t)=>({_$litDirective$:e,values:t});let F=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,r){this._$Ct=t,this._$AM=i,this._$Ci=r}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=(e,t)=>{var r;const i=e._$AN;if(i===void 0)return!1;for(const n of i)(r=n._$AO)==null||r.call(n,t,!1),R(n,t);return!0},I=e=>{let t,i;do{if((t=e._$AM)===void 0)break;i=t._$AN,i.delete(e),e=t}while((i==null?void 0:i.size)===0)},G=e=>{for(let t;t=e._$AM;e=t){let i=t._$AN;if(i===void 0)t._$AN=i=new Set;else if(i.has(e))break;i.add(e),at(t)}};function ot(e){this._$AN!==void 0?(I(this),this._$AM=e,G(this)):this._$AM=e}function rt(e,t=!1,i=0){const r=this._$AH,n=this._$AN;if(n!==void 0&&n.size!==0)if(t)if(Array.isArray(r))for(let o=i;o<r.length;o++)R(r[o],!1),I(r[o]);else r!=null&&(R(r,!1),I(r));else R(this,e)}const at=e=>{e.type==W.CHILD&&(e._$AP??(e._$AP=rt),e._$AQ??(e._$AQ=ot))};class nt extends F{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,r){super._$AT(t,i,r),G(this),this.isConnected=t._$AU}_$AO(t,i=!0){var r,n;t!==this.isConnected&&(this.isConnected=t,t?(r=this.reconnected)==null||r.call(this):(n=this.disconnected)==null||n.call(this)),i&&(R(this,t),I(this))}setValue(t){if(it(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class st{constructor(t){this.G=t}disconnect(){this.G=void 0}reconnect(t){this.G=t}deref(){return this.G}}class ct{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??(this.Y=new Promise(t=>this.Z=t))}resume(){var t;(t=this.Z)==null||t.call(this),this.Y=this.Z=void 0}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=e=>!et(e)&&typeof e.then=="function",B=1073741823;class lt extends nt{constructor(){super(...arguments),this._$Cwt=B,this._$Cbt=[],this._$CK=new st(this),this._$CX=new ct}render(...t){return t.find(i=>!j(i))??V}update(t,i){const r=this._$Cbt;let n=r.length;this._$Cbt=i;const o=this._$CK,s=this._$CX;this.isConnected||this.disconnected();for(let c=0;c<i.length&&!(c>this._$Cwt);c++){const u=i[c];if(!j(u))return this._$Cwt=c,u;c<n&&u===r[c]||(this._$Cwt=B,n=0,Promise.resolve(u).then(async p=>{for(;s.get();)await s.get();const g=o.deref();if(g!==void 0){const D=g._$Cbt.indexOf(u);D>-1&&D<g._$Cwt&&(g._$Cwt=D,g.setValue(p))}}))}return V}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}const ut=H(lt);class dt{constructor(){this.cache=new Map}set(t,i){this.cache.set(t,i)}get(t){return this.cache.get(t)}has(t){return this.cache.has(t)}delete(t){this.cache.delete(t)}clear(){this.cache.clear()}}const C=new dt,_t=E`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`;var P=function(e,t,i,r){var n=arguments.length,o=n<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o};const M={add:async()=>(await a(()=>import("./add-DWAujV_5.js"),__vite__mapDeps([0,1,2,3,4,5]))).addSvg,allWallets:async()=>(await a(()=>import("./all-wallets-BMF0Aduq.js"),__vite__mapDeps([6,1,2,3,4,5]))).allWalletsSvg,arrowBottomCircle:async()=>(await a(()=>import("./arrow-bottom-circle-BZe1QmL6.js"),__vite__mapDeps([7,1,2,3,4,5]))).arrowBottomCircleSvg,appStore:async()=>(await a(()=>import("./app-store-CQNALj0N.js"),__vite__mapDeps([8,1,2,3,4,5]))).appStoreSvg,apple:async()=>(await a(()=>import("./apple-C0GwyXif.js"),__vite__mapDeps([9,1,2,3,4,5]))).appleSvg,arrowBottom:async()=>(await a(()=>import("./arrow-bottom-Dx19gHOe.js"),__vite__mapDeps([10,1,2,3,4,5]))).arrowBottomSvg,arrowLeft:async()=>(await a(()=>import("./arrow-left-Cg0Mkyky.js"),__vite__mapDeps([11,1,2,3,4,5]))).arrowLeftSvg,arrowRight:async()=>(await a(()=>import("./arrow-right-BK40szvP.js"),__vite__mapDeps([12,1,2,3,4,5]))).arrowRightSvg,arrowTop:async()=>(await a(()=>import("./arrow-top-DkCJh9K7.js"),__vite__mapDeps([13,1,2,3,4,5]))).arrowTopSvg,bank:async()=>(await a(()=>import("./bank-Eugm4q8Y.js"),__vite__mapDeps([14,1,2,3,4,5]))).bankSvg,browser:async()=>(await a(()=>import("./browser-BlRIx-hN.js"),__vite__mapDeps([15,1,2,3,4,5]))).browserSvg,card:async()=>(await a(()=>import("./card-CIkRw4ub.js"),__vite__mapDeps([16,1,2,3,4,5]))).cardSvg,checkmark:async()=>(await a(()=>import("./checkmark-BUQyWlJu.js"),__vite__mapDeps([17,1,2,3,4,5]))).checkmarkSvg,checkmarkBold:async()=>(await a(()=>import("./checkmark-bold-Bq8Cl9Iu.js"),__vite__mapDeps([18,1,2,3,4,5]))).checkmarkBoldSvg,chevronBottom:async()=>(await a(()=>import("./chevron-bottom-BVCOOTHE.js"),__vite__mapDeps([19,1,2,3,4,5]))).chevronBottomSvg,chevronLeft:async()=>(await a(()=>import("./chevron-left-B-I-KYvC.js"),__vite__mapDeps([20,1,2,3,4,5]))).chevronLeftSvg,chevronRight:async()=>(await a(()=>import("./chevron-right-AjB1q9ip.js"),__vite__mapDeps([21,1,2,3,4,5]))).chevronRightSvg,chevronTop:async()=>(await a(()=>import("./chevron-top-CivysIbp.js"),__vite__mapDeps([22,1,2,3,4,5]))).chevronTopSvg,chromeStore:async()=>(await a(()=>import("./chrome-store-CEmi_fxZ.js"),__vite__mapDeps([23,1,2,3,4,5]))).chromeStoreSvg,clock:async()=>(await a(()=>import("./clock-bss1VWba.js"),__vite__mapDeps([24,1,2,3,4,5]))).clockSvg,close:async()=>(await a(()=>import("./close-BRsFfXXB.js"),__vite__mapDeps([25,1,2,3,4,5]))).closeSvg,compass:async()=>(await a(()=>import("./compass-3ioAr1H4.js"),__vite__mapDeps([26,1,2,3,4,5]))).compassSvg,coinPlaceholder:async()=>(await a(()=>import("./coinPlaceholder-Et-iRObN.js"),__vite__mapDeps([27,1,2,3,4,5]))).coinPlaceholderSvg,copy:async()=>(await a(()=>import("./copy-Cn5pTndd.js"),__vite__mapDeps([28,1,2,3,4,5]))).copySvg,cursor:async()=>(await a(()=>import("./cursor-CVJR-t-z.js"),__vite__mapDeps([29,1,2,3,4,5]))).cursorSvg,cursorTransparent:async()=>(await a(()=>import("./cursor-transparent-CgVBrawI.js"),__vite__mapDeps([30,1,2,3,4,5]))).cursorTransparentSvg,desktop:async()=>(await a(()=>import("./desktop-Bm9SlX5C.js"),__vite__mapDeps([31,1,2,3,4,5]))).desktopSvg,disconnect:async()=>(await a(()=>import("./disconnect-f5YMwX2L.js"),__vite__mapDeps([32,1,2,3,4,5]))).disconnectSvg,discord:async()=>(await a(()=>import("./discord-BMDDOKoD.js"),__vite__mapDeps([33,1,2,3,4,5]))).discordSvg,etherscan:async()=>(await a(()=>import("./etherscan-D_vKc6Wx.js"),__vite__mapDeps([34,1,2,3,4,5]))).etherscanSvg,extension:async()=>(await a(()=>import("./extension-0Iyro_X6.js"),__vite__mapDeps([35,1,2,3,4,5]))).extensionSvg,externalLink:async()=>(await a(()=>import("./external-link-COCTwcT5.js"),__vite__mapDeps([36,1,2,3,4,5]))).externalLinkSvg,facebook:async()=>(await a(()=>import("./facebook-ja-kFO3m.js"),__vite__mapDeps([37,1,2,3,4,5]))).facebookSvg,farcaster:async()=>(await a(()=>import("./farcaster-DfTQ65E2.js"),__vite__mapDeps([38,1,2,3,4,5]))).farcasterSvg,filters:async()=>(await a(()=>import("./filters-DkzaiAkN.js"),__vite__mapDeps([39,1,2,3,4,5]))).filtersSvg,github:async()=>(await a(()=>import("./github-DISw6sTC.js"),__vite__mapDeps([40,1,2,3,4,5]))).githubSvg,google:async()=>(await a(()=>import("./google-BrTjHpFk.js"),__vite__mapDeps([41,1,2,3,4,5]))).googleSvg,helpCircle:async()=>(await a(()=>import("./help-circle-Ca3eX8TF.js"),__vite__mapDeps([42,1,2,3,4,5]))).helpCircleSvg,image:async()=>(await a(()=>import("./image-C_6FAoZ1.js"),__vite__mapDeps([43,1,2,3,4,5]))).imageSvg,id:async()=>(await a(()=>import("./id-fPok6SY-.js"),__vite__mapDeps([44,1,2,3,4,5]))).idSvg,infoCircle:async()=>(await a(()=>import("./info-circle-Ba-awc9z.js"),__vite__mapDeps([45,1,2,3,4,5]))).infoCircleSvg,lightbulb:async()=>(await a(()=>import("./lightbulb-D5H35nsH.js"),__vite__mapDeps([46,1,2,3,4,5]))).lightbulbSvg,mail:async()=>(await a(()=>import("./mail-BdwYeJzk.js"),__vite__mapDeps([47,1,2,3,4,5]))).mailSvg,mobile:async()=>(await a(()=>import("./mobile-C5N_ueE4.js"),__vite__mapDeps([48,1,2,3,4,5]))).mobileSvg,more:async()=>(await a(()=>import("./more-DLRbHtUp.js"),__vite__mapDeps([49,1,2,3,4,5]))).moreSvg,networkPlaceholder:async()=>(await a(()=>import("./network-placeholder-CWwFVUUC.js"),__vite__mapDeps([50,1,2,3,4,5]))).networkPlaceholderSvg,nftPlaceholder:async()=>(await a(()=>import("./nftPlaceholder-C2HpyqWx.js"),__vite__mapDeps([51,1,2,3,4,5]))).nftPlaceholderSvg,off:async()=>(await a(()=>import("./off-9wL8aXek.js"),__vite__mapDeps([52,1,2,3,4,5]))).offSvg,playStore:async()=>(await a(()=>import("./play-store-DoBJufBF.js"),__vite__mapDeps([53,1,2,3,4,5]))).playStoreSvg,plus:async()=>(await a(()=>import("./plus-IOiyHnoB.js"),__vite__mapDeps([54,1,2,3,4,5]))).plusSvg,qrCode:async()=>(await a(()=>import("./qr-code-BDKkagAb.js"),__vite__mapDeps([55,1,2,3,4,5]))).qrCodeIcon,recycleHorizontal:async()=>(await a(()=>import("./recycle-horizontal-Cpuv7Fh8.js"),__vite__mapDeps([56,1,2,3,4,5]))).recycleHorizontalSvg,refresh:async()=>(await a(()=>import("./refresh-Dh-i9YqI.js"),__vite__mapDeps([57,1,2,3,4,5]))).refreshSvg,search:async()=>(await a(()=>import("./search-bLLqh4Ij.js"),__vite__mapDeps([58,1,2,3,4,5]))).searchSvg,send:async()=>(await a(()=>import("./send-Dltj8Hk4.js"),__vite__mapDeps([59,1,2,3,4,5]))).sendSvg,swapHorizontal:async()=>(await a(()=>import("./swapHorizontal-CQCvt7a8.js"),__vite__mapDeps([60,1,2,3,4,5]))).swapHorizontalSvg,swapHorizontalMedium:async()=>(await a(()=>import("./swapHorizontalMedium-B02Uk6SS.js"),__vite__mapDeps([61,1,2,3,4,5]))).swapHorizontalMediumSvg,swapHorizontalBold:async()=>(await a(()=>import("./swapHorizontalBold-CiZ-uyYK.js"),__vite__mapDeps([62,1,2,3,4,5]))).swapHorizontalBoldSvg,swapHorizontalRoundedBold:async()=>(await a(()=>import("./swapHorizontalRoundedBold-C3igdnDp.js"),__vite__mapDeps([63,1,2,3,4,5]))).swapHorizontalRoundedBoldSvg,swapVertical:async()=>(await a(()=>import("./swapVertical-CYLUK89n.js"),__vite__mapDeps([64,1,2,3,4,5]))).swapVerticalSvg,telegram:async()=>(await a(()=>import("./telegram-BwGXYPsx.js"),__vite__mapDeps([65,1,2,3,4,5]))).telegramSvg,threeDots:async()=>(await a(()=>import("./three-dots-j5zYwmhc.js"),__vite__mapDeps([66,1,2,3,4,5]))).threeDotsSvg,twitch:async()=>(await a(()=>import("./twitch-dXhv0u61.js"),__vite__mapDeps([67,1,2,3,4,5]))).twitchSvg,twitter:async()=>(await a(()=>import("./x-DgmT3JfT.js"),__vite__mapDeps([68,1,2,3,4,5]))).xSvg,twitterIcon:async()=>(await a(()=>import("./twitterIcon-GcD_XKHY.js"),__vite__mapDeps([69,1,2,3,4,5]))).twitterIconSvg,verify:async()=>(await a(()=>import("./verify-B6iAmWEt.js"),__vite__mapDeps([70,1,2,3,4,5]))).verifySvg,verifyFilled:async()=>(await a(()=>import("./verify-filled-DNDdNjCP.js"),__vite__mapDeps([71,1,2,3,4,5]))).verifyFilledSvg,wallet:async()=>(await a(()=>import("./wallet-BI1Ex1Et.js"),__vite__mapDeps([72,1,2,3,4,5]))).walletSvg,walletConnect:async()=>(await a(()=>import("./walletconnect-DiuzpInv.js"),__vite__mapDeps([73,1,2,3,4,5]))).walletConnectSvg,walletConnectLightBrown:async()=>(await a(()=>import("./walletconnect-DiuzpInv.js"),__vite__mapDeps([73,1,2,3,4,5]))).walletConnectLightBrownSvg,walletConnectBrown:async()=>(await a(()=>import("./walletconnect-DiuzpInv.js"),__vite__mapDeps([73,1,2,3,4,5]))).walletConnectBrownSvg,walletPlaceholder:async()=>(await a(()=>import("./wallet-placeholder-DSuDWKVi.js"),__vite__mapDeps([74,1,2,3,4,5]))).walletPlaceholderSvg,warningCircle:async()=>(await a(()=>import("./warning-circle-duXKOAZ-.js"),__vite__mapDeps([75,1,2,3,4,5]))).warningCircleSvg,x:async()=>(await a(()=>import("./x-DgmT3JfT.js"),__vite__mapDeps([68,1,2,3,4,5]))).xSvg,info:async()=>(await a(()=>import("./info-BJq4PMcm.js"),__vite__mapDeps([76,1,2,3,4,5]))).infoSvg,exclamationTriangle:async()=>(await a(()=>import("./exclamation-triangle-C5wtRRyb.js"),__vite__mapDeps([77,1,2,3,4,5]))).exclamationTriangleSvg,reown:async()=>(await a(()=>import("./reown-logo-Dzyujtsk.js"),__vite__mapDeps([78,1,2,3,4,5]))).reownSvg};async function ht(e){if(C.has(e))return C.get(e);const i=(M[e]??M.copy)();return C.set(e,i),i}let m=class extends ${constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300",this.aspectRatio="1 / 1"}render(){return this.style.cssText=`
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `,w`${ut(ht(this.name),w`<div class="fallback"></div>`)}`}};m.styles=[b,U,_t];P([l()],m.prototype,"size",void 0);P([l()],m.prototype,"name",void 0);P([l()],m.prototype,"color",void 0);P([l()],m.prototype,"aspectRatio",void 0);m=P([S("wui-icon")],m);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt=H(class extends F{constructor(e){var t;if(super(e),e.type!==W.ATTRIBUTE||e.name!=="class"||((t=e.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var r,n;if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in t)t[o]&&!((r=this.nt)!=null&&r.has(o))&&this.st.add(o);return this.render(t)}const i=e.element.classList;for(const o of this.st)o in t||(i.remove(o),this.st.delete(o));for(const o in t){const s=!!t[o];s===this.st.has(o)||(n=this.nt)!=null&&n.has(o)||(s?(i.add(o),this.st.add(o)):(i.remove(o),this.st.delete(o)))}return V}}),gt=E`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`;var O=function(e,t,i,r){var n=arguments.length,o=n<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o};let y=class extends ${constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left",this.lineClamp=void 0}render(){const t={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `,w`<slot class=${pt(t)}></slot>`}};y.styles=[b,gt];O([l()],y.prototype,"variant",void 0);O([l()],y.prototype,"color",void 0);O([l()],y.prototype,"align",void 0);O([l()],y.prototype,"lineClamp",void 0);y=O([S("wui-text")],y);const vt=E`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`;var v=function(e,t,i,r){var n=arguments.length,o=n<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o};let h=class extends ${constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){const t=this.iconSize||this.size,i=this.size==="lg",r=this.size==="xl",n=i?"12%":"16%",o=i?"xxs":r?"s":"3xl",s=this.background==="gray",c=this.background==="opaque",u=this.backgroundColor==="accent-100"&&c||this.backgroundColor==="success-100"&&c||this.backgroundColor==="error-100"&&c||this.backgroundColor==="inverse-100"&&c;let p=`var(--wui-color-${this.backgroundColor})`;return u?p=`var(--wui-icon-box-bg-${this.backgroundColor})`:s&&(p=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`
       --local-bg-value: ${p};
       --local-bg-mix: ${u||s?"100%":n};
       --local-border-radius: var(--wui-border-radius-${o});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${this.borderColor==="wui-color-bg-125"?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}
   `,w` <wui-icon color=${this.iconColor} size=${t} name=${this.icon}></wui-icon> `}};h.styles=[b,K,vt];v([l()],h.prototype,"size",void 0);v([l()],h.prototype,"backgroundColor",void 0);v([l()],h.prototype,"iconColor",void 0);v([l()],h.prototype,"iconSize",void 0);v([l()],h.prototype,"background",void 0);v([l({type:Boolean})],h.prototype,"border",void 0);v([l()],h.prototype,"borderColor",void 0);v([l()],h.prototype,"icon",void 0);h=v([S("wui-icon-box")],h);const ft=E`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`;var L=function(e,t,i,r){var n=arguments.length,o=n<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o};let x=class extends ${constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,w`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};x.styles=[b,U,ft];L([l()],x.prototype,"src",void 0);L([l()],x.prototype,"alt",void 0);L([l()],x.prototype,"size",void 0);x=L([S("wui-image")],x);const wt=E`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }
`;var z=function(e,t,i,r){var n=arguments.length,o=n<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o};let T=class extends ${constructor(){super(...arguments),this.variant="main",this.size="lg"}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;const t=this.size==="md"?"mini-700":"micro-700";return w`
      <wui-text data-variant=${this.variant} variant=${t} color="inherit">
        <slot></slot>
      </wui-text>
    `}};T.styles=[b,wt];z([l()],T.prototype,"variant",void 0);z([l()],T.prototype,"size",void 0);T=z([S("wui-tag")],T);const mt=E`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`;var k=function(e,t,i,r){var n=arguments.length,o=n<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,i):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,i,r);else for(var c=e.length-1;c>=0;c--)(s=e[c])&&(o=(n<3?s(o):n>3?s(t,i,o):s(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o};let A=class extends ${constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText=`--local-color: ${this.color==="inherit"?"inherit":`var(--wui-color-${this.color})`}`,this.dataset.size=this.size,w`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};A.styles=[b,mt];k([l()],A.prototype,"color",void 0);k([l()],A.prototype,"size",void 0);A=k([S("wui-loading-spinner")],A);export{f as U,pt as a,S as c,H as e,nt as f,l as n,St as o,bt as r};
