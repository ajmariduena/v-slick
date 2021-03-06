import Vue from "vue";
import $ from "jquery";
import slick from "slick-carousel/slick/slick.min";

const emit = (vnode, name, data) => {
    const handlers = (vnode.data && vnode.data.on) || (vnode.componentOptions && vnode.componentOptions.listeners);

    if (handlers && handlers[name]) {
        handlers[name].fns(data);
    }
};

export default Vue.directive("slick", {
    inserted: function(el, binding, vnode) {
        $(el).slick(binding.value);

        /* Events */
        $(el).on("afterChange", function(slick, currentSlide) {
            emit(vnode, "afterchange", currentSlide);
        });

        $(el).on("beforeChange", function(slick, currentSlide, nextSlide) {
            emit(vnode, "beforechange", { currentSlide, nextSlide });
        });

        $(el).on("breakpoint", function(event, slick, breakpoint) {
            emit(vnode, "onbreakpoint", { event, breakpoint });
        });

        $(el).on("destroy", function(event, slick) {
            emit(vnode, "ondestroy", event);
        });

        $(el).on("init", function(slick) {
            emit(vnode, "oninit", slick);
        });

        $(el).on("reInit", function(slick) {
            emit(vnode, "reinit", slick);
        });

        $(el).on("edge", function(slick, direction) {
            emit(vnode, "onedge", direction);
        });

        $(el).on("setPosition", function(slick) {
            emit(vnode, "setposition", slick);
        });

        $(el).on("swipe", function(slick, direction) {
            emit(vnode, "onswipe", direction);
        });

        $(el).on("lazyLoaded", function(event, slick, image, imageSource) {
            emit(vnode, "lazyloaded", { event, image, imageSource });
        });

        $(el).on("lazyLoadError", function(slick, direction) {
            emit(vnode, "lazyloaderror", { event, image, imageSource });
        });
    },
});
