export function CSSFilterImageBackground (imageUrlSize, viewportIsMobile) {
    return {
        backgroundImage: `linear-gradient(
            rgba(55, 0, 55, 0.5), 
            rgba(55, 0, 55, 0.5)
          ), 
          url("${imageUrlSize}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundClip: 'content-box',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
        height: viewportIsMobile ? '37vh' : '28vh',
        padding: viewportIsMobile ? '0' : '15',
    } 
}

export function SVGFilterImageBackground (imageUrl, viewportIsMobile, color) {
    return {
        backgroundImage: `url("${imageUrl}")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        filter: `url(#duotone_${color})`,
        WebkitFilter: `url(#duotone_${color})`,
        MozFilter: `url(#duotone_${color})`,
        Ofilter: `url(#duotone_${color})`,
        MsFilter: `url(#duotone_${color})`,
        content: '',
        display: "block",
        width:  "99%",
        height: "100%",
        // mixBlendMode: "darken",
        position: "absolute",
        top: "0",
        left: "0"
    } 
}

export function duotoneB (viewportIsMobile) {
    return {
        backgroundColor: "rgb(255, 84, 88)",
        content: '',
        display: "block",
        width: viewportIsMobile ? "100%" : "92%",
        height: "100%",
        mixBlendMode: "darken",
        position: "absolute",
        top: "0",
        left: "15px"
    }
}
export function duotoneA (viewportIsMobile) {
    return {
        backgroundColor: "rgb(25, 37, 80)",
        content: '',
        display: "block",
        width: viewportIsMobile ? "100%" : "92%",
        height: "100%",
        mixBlendMode: "lighten",
        position: "absolute",
        top: "0",
        left: "15px"
    }
}