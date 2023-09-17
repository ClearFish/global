// redirectTo 跳转
export function redirectTo(url, target) {
    if (!url) {
        return;
    }
    let a = document.createElement('a');
    // target: '_blank','_top','_parent','_self'
    a.target = target ?? "_blank";
    a.href = url;
    a.click();
}