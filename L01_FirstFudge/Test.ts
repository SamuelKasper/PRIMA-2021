namespace L01_FirstFudge{
    import fc = FudgeCore;

    window.addEventListener("load", hndLoad);
    export let viewport: fc.Viewport;

    function hndLoad(_event: Event): void{
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fc.Debug.log(canvas);

    
    }
}
