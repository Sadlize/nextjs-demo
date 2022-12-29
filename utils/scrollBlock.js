const getScrollbarWidth = () => {
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.msOverflowStyle = 'scrollbar';
  document.body.append(outer);
  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';
  const inner = document.createElement('div');
  inner.style.width = '100%';
  outer.append(inner);
  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
};

export const scrollBlock = (status, element, indent = 0, scrollPosition, noTopCalc, keepOverflow) => { // element - scroll parent
	if (status) {
		if (!noTopCalc) {
			element.style.top = `-${window.scrollY + indent}px`;
		}

		element.style.overflow = 'hidden';
		element.style.position = 'fixed';
		element.style.width = '100%';
		element.style.paddingRight = `${getScrollbarWidth()}px`; // windows fix
		if (element === document.body) {
			document.body.parentNode.style.height = '100vh'; // safari 15 fix
		}
	} else {
		if (element === document.body) {
			document.body.parentNode.style.removeProperty('height');
		}

		element.style.removeProperty('padding-right');
		if (!keepOverflow) {
			element.style.removeProperty('overflow');
		}

		element.style.removeProperty('top');
		element.style.removeProperty('width');
		element.style.removeProperty('position');
		if (scrollPosition) {
			window.scrollTo(0, scrollPosition);
		}
	}
};
