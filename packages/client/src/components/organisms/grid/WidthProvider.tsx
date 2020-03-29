import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  ItemCallback,
  Layout,
  ResponsiveProps
} from 'react-grid-layout';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const DEFAULT_WIDTH: number = 1200;

interface PropsType extends ResponsiveProps {
  measureBeforeMount?: boolean;
}

export default function WidthProvider(
  ComposedComponent: any
): React.FC<PropsType> {
  return (props) => {
    const { measureBeforeMount, ...rest } = props;
    const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
    const [mounted, setMounted] = useState<boolean>(false);
    const [isScrollbarVisible, setIsScrollbarVisible] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const onWindowResize = useCallback(() => {
      if (!mounted) {
        return;
      }

      setWidth(ref?.current?.offsetWidth || DEFAULT_WIDTH);
    }, [mounted]);
    const checkScrollbarVisible = useCallback(() => {
      const visible: boolean = getScrollbarVisible(ref?.current);

      if (isScrollbarVisible === visible) {
        return;
      }

      setIsScrollbarVisible(visible);
      onWindowResize();
    }, [isScrollbarVisible]);

    const onDragStop: ItemCallback = (
      layout: Layout[],
      oldItem: Layout,
      newItem: Layout,
      placeholder: Layout,
      event: MouseEvent,
      element: HTMLElement
    ) => {
      rest.onDragStop && rest.onDragStop(layout, oldItem, newItem, placeholder, event, element);
      checkScrollbarVisible();
    };

    const onResizeStop: ItemCallback = (
      layout: Layout[],
      oldItem: Layout,
      newItem: Layout,
      placeholder: Layout,
      event: MouseEvent,
      element: HTMLElement
    ) => {
      rest.onResizeStop && rest.onResizeStop(layout, oldItem, newItem, placeholder, event, element);
      checkScrollbarVisible();
    };

    useEffect(() => {
      setMounted(true);

      window.addEventListener('resize', onWindowResize);
      checkScrollbarVisible();
      onWindowResize();
      return () => {
        setMounted(false);
        window.removeEventListener('resize', onWindowResize);
      }
    }, [onWindowResize, checkScrollbarVisible]);

    function getScrollbarVisible(element?: HTMLDivElement | null): boolean {
      if (!element) {
        return false;
      }

      return element.scrollHeight > element.clientHeight
    }

    return (
      <Wrapper ref={ref}>
        {
          measureBeforeMount && !mounted ?
            <div className={props.className} style={props.style}/> :
            <ComposedComponent {...rest} width={width} onDragStop={onDragStop} onResizeStop={onResizeStop}/>
        }
      </Wrapper>
    );
  };
}