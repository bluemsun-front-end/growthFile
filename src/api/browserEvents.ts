// src/utils/browserEvents.ts
export function setupUnloadListener() {
    window.addEventListener("unload", () => {
      // 清除 token，以下代码根据存储位置选择
      localStorage.removeItem("token");
      console.log("Token has been cleared on unload");
    });
  }
  