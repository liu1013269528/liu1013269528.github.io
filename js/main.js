function init() {
    // 如果需要操作元素时候，由于函数在 head 中，界面可能还没有加载完成，需要延迟加载
    console.log('欢迎你,访问我的博客,希望你能够在这里有所收获.');
}

setTimeout(init(), 500);