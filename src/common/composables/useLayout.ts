import { Component, inject, markRaw, provide, Ref, ref } from "vue";

type LayoutNames = "UserLayout" | "DefaultLayout";

export function useLayout(layoutName: LayoutNames): void {
  const changeLayout = inject<ChangeLayout | boolean>("changeLayout", false);
  if (typeof changeLayout !== "function") {
    console.error("Can not detect layout manager");
  } else {
    changeLayout(layoutName);
  }
}

/**
 *
 * @param {Array} Layouts - Array of Layout components
 * @returns
 */
interface ChangeLayout {
  (newLayout: LayoutNames): void;
}
export function initLayout(Layouts: Record<LayoutNames, Component>): {
  layouts: Record<string, Component>;
  layoutName: Ref<LayoutNames>;
} {
  const layoutName = ref<LayoutNames>("UserLayout");
  const layouts = markRaw(Layouts);

  function changeLayout(newLayout: LayoutNames) {
    if (newLayout === layoutName.value) {
      return;
    }

    if (Layouts[newLayout]) {
      layoutName.value = newLayout;
      // layout = markRaw(Layouts[newLayout]);
    } else {
      layoutName.value = "DefaultLayout";
      // layout = markRaw(Layouts.DefaultLayout);
    }
  }

  provide("layoutName", layoutName);
  provide<ChangeLayout>("changeLayout", changeLayout);

  return {
    layouts,
    layoutName,
  };
}
