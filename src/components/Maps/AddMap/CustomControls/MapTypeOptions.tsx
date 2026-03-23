export const MapTypeOptions = (map: any, maps: any, setMapType: any) => {
  const mapTypeControlEvent = () => {
    const controlDiv = document.createElement("div");

    const controlUI = document.createElement("div");
    controlUI.style.display = "flex";
    controlUI.style.flexDirection = "row";
    controlUI.style.backgroundColor = "#ffffff";
    controlUI.style.border = "none";
    controlUI.style.borderRadius = "24px";
    controlUI.style.boxShadow = "0 2px 8px rgba(0,0,0,0.25)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "16px";
    controlUI.style.overflow = "hidden";
    controlUI.style.padding = "3px";
    controlUI.style.gap = "2px";
    controlUI.title = "Click to toggle map type";
    controlDiv.appendChild(controlUI);

    const types = ["roadmap", "satellite", "hybrid"];
    const labels: Record<string, string> = {
      roadmap: "Map",
      satellite: "Satellite",
      hybrid: "Hybrid",
    };

    types.forEach((type) => {
      const btn = document.createElement("div");

      btn.style.color = "#555";
      btn.style.fontFamily = "'Roboto', Arial, sans-serif";
      btn.style.fontSize = "12px";
      btn.style.fontWeight = "500";
      btn.style.lineHeight = "28px";
      btn.style.padding = "0 14px";
      btn.style.borderRadius = "20px";
      btn.style.transition = "background 0.2s, color 0.2s";
      btn.style.userSelect = "none";
      btn.style.whiteSpace = "nowrap";
      btn.innerHTML = labels[type];
      controlUI.appendChild(btn);

      const setActive = (el: HTMLElement) => {
        el.style.backgroundColor = "#1b2459";
        el.style.color = "#fff";
        el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
      };

      const setInactive = (el: HTMLElement) => {
        el.style.backgroundColor = "transparent";
        el.style.color = "#555";
        el.style.boxShadow = "none";
      };

      if (type === "roadmap") {
        setActive(btn);
      }

      btn.addEventListener("mouseenter", () => {
        const isActive = btn.style.backgroundColor === "rgb(27, 36, 89)";
        if (!isActive) {
          btn.style.backgroundColor = "#f0f0f0";
          btn.style.color = "#333";
        }
      });

      btn.addEventListener("mouseleave", () => {
        const isActive = btn.style.backgroundColor === "rgb(27, 36, 89)";
        if (!isActive) {
          setInactive(btn);
        }
      });

      btn.addEventListener("click", () => {
        setMapType(type);
        Array.from(controlUI.children).forEach((child: any) => {
          setInactive(child);
        });
        setActive(btn);
      });
    });

    return controlDiv;
  };

  const mapTypeControlDiv: any = document.createElement("div");
  const mapTypeControl = mapTypeControlEvent();
  mapTypeControlDiv.index = 1;
  map.controls[maps.ControlPosition.BOTTOM_CENTER].push(mapTypeControlDiv);
  mapTypeControlDiv.appendChild(mapTypeControl);
  setMapType("roadmap");
};
