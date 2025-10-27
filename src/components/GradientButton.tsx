import {
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type Ref,
  forwardRef,
  useMemo
} from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { useCursorGradient } from '../hooks/useCursorGradient';

type BaseProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'blue' | 'orange';
};

type ButtonProps = BaseProps &
  Omit<HTMLMotionProps<'button'>, 'children' | 'className' | 'style' | 'ref'> & {
    as?: 'button';
    style?: CSSProperties;
  };

type LinkProps = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, 'children' | 'className' | 'style'> & {
    as: 'link';
    to: string;
    style?: CSSProperties;
    tabIndex?: number;
  };

type Props = ButtonProps | LinkProps;

/**
 * Переиспользуемая кнопка с градиентом, следующим за курсором
 * С анимированной вращающейся рамкой при hover
 */
export const GradientButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  ({ children, className = '', disabled, variant = 'blue', ...props }, ref) => {
    const { handleMouseMove, handleMouseLeave } = useCursorGradient(variant);

    const baseClasses = `
      inline-flex items-center justify-center rounded-xl px-6 py-3
      text-white text-sm font-medium shadow-sm hover:shadow-md
      focus:outline-none focus:ring-2 focus:ring-blue-500
      transition-all duration-200 relative overflow-hidden
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    const gradientStyle = useMemo(() => ({
      background: variant === 'orange'
        ? 'linear-gradient(90deg, #ea580c, #dc2626, #c2410c)'
        : 'linear-gradient(90deg, #3b82f6, #2563eb, #4f46e5)'
    }), [variant]);

    if (props.as === 'link') {
      const {
        to,
        onClick,
        onMouseMove: userOnMouseMove,
        onMouseLeave: userOnMouseLeave,
        style,
        tabIndex,
        ...linkProps
      } = props;

      const computedStyle: CSSProperties = {
        ...gradientStyle,
        ...(style ?? {}),
        ...(disabled ? { pointerEvents: 'none' } : {})
      };

      const handleClick: ComponentPropsWithoutRef<typeof Link>['onClick'] = (event) => {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        onClick?.(event);
      };

      const handleLinkMouseMove = disabled
        ? undefined
        : (event: ReactMouseEvent<HTMLAnchorElement>) => {
            handleMouseMove(event);
            userOnMouseMove?.(event);
          };

      const handleLinkMouseLeave = disabled
        ? undefined
        : (event: ReactMouseEvent<HTMLAnchorElement>) => {
            handleMouseLeave(event);
            userOnMouseLeave?.(event);
          };

      return (
        <Link
          ref={ref as Ref<HTMLAnchorElement>}
          to={to}
          className={baseClasses}
          onClick={handleClick}
          onMouseMove={handleLinkMouseMove}
          onMouseLeave={handleLinkMouseLeave}
          style={computedStyle}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : tabIndex}
          {...linkProps}
        >
          <span className="relative z-10">{children}</span>
        </Link>
      );
    }

    const {
      onMouseMove: userOnMouseMove,
      onMouseLeave: userOnMouseLeave,
      style,
      ...buttonProps
    } = props;

    const computedStyle: CSSProperties = {
      ...gradientStyle,
      ...(style ?? {})
    };

    const handleButtonMouseMove = disabled
      ? undefined
      : (event: ReactMouseEvent<HTMLButtonElement>) => {
          handleMouseMove(event);
          userOnMouseMove?.(event);
        };

    const handleButtonMouseLeave = disabled
      ? undefined
      : (event: ReactMouseEvent<HTMLButtonElement>) => {
          handleMouseLeave(event);
          userOnMouseLeave?.(event);
        };

    return (
      <motion.button
        ref={ref as Ref<HTMLButtonElement>}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        className={baseClasses}
        onMouseMove={handleButtonMouseMove}
        onMouseLeave={handleButtonMouseLeave}
        style={computedStyle}
        disabled={disabled}
        {...buttonProps}
      >
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  }
);

GradientButton.displayName = 'GradientButton';
