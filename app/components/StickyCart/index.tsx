import {
  getBorderRadius,
  getStickyCartIconComponent,
  type StickyCartPosition,
  type StickyCartSettings,
} from "../../lib/stickyCart";
import styles from "./StickyCart.module.css";

type StickyCartProps = {
  settings: StickyCartSettings;
  itemCount: number;
  onOpen: () => void;
};

function getDesktopPositionClass(position: StickyCartPosition): string {
  switch (position) {
    case "bottom-left":
      return styles.posDesktopBottomLeft;
    case "top-right":
      return styles.posDesktopTopRight;
    case "top-left":
      return styles.posDesktopTopLeft;
    case "bottom-right":
    default:
      return styles.posDesktopBottomRight;
  }
}

function getMobilePositionClass(position: StickyCartPosition): string {
  switch (position) {
    case "bottom-left":
      return styles.posMobileBottomLeft;
    case "top-right":
      return styles.posMobileTopRight;
    case "top-left":
      return styles.posMobileTopLeft;
    case "bottom-right":
    default:
      return styles.posMobileBottomRight;
  }
}

export function StickyCart({ settings, itemCount, onOpen }: StickyCartProps) {
  const isHiddenBySettings =
    !settings.enabled || (settings.hideWhenEmpty && itemCount === 0);
  const showCount =
    settings.showItemCount && itemCount > 0 && !isHiddenBySettings;

  const Icon = getStickyCartIconComponent(settings.icon);
  const borderRadius = getBorderRadius(settings.shapeSize, settings.roundness);

  const positionClasses = [
    getDesktopPositionClass(settings.positionDesktop),
    getMobilePositionClass(settings.positionMobile),
    settings.displayOnMobile ? styles.showOnMobile : "",
    isHiddenBySettings ? styles.stickyCartHidden : styles.stickyCartVisible,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      className={`${styles.stickyCart} ${positionClasses}`}
      style={{
        width: settings.shapeSize,
        height: settings.shapeSize,
        backgroundColor: settings.shapeColor,
        borderRadius,
      }}
      onClick={onOpen}
      aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} items` : ""}`}
      aria-hidden={isHiddenBySettings}
      tabIndex={isHiddenBySettings ? -1 : 0}
    >
      <Icon
        size={settings.iconSize}
        color={settings.iconColor}
        strokeWidth={2}
        aria-hidden="true"
      />
      {showCount ? (
        <span
          className={`${styles.count} ${
            settings.countShape === "circle"
              ? styles.countCircle
              : styles.countRectangle
          }`}
          style={{
            color: settings.countColor,
            backgroundColor: settings.countBackground,
          }}
        >
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </button>
  );
}

export default StickyCart;
