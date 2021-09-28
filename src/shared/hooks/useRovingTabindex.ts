import { useRef } from 'react';
import { useFocusEffect, useRovingTabIndex } from 'react-roving-tabindex';

export const useRovingTabindex = <TargetElement extends HTMLElement>() => {
  const ref = useRef<TargetElement>(null);
  const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(ref, false);

  useFocusEffect(focused, ref);

  return { tabIndex, ref, onKeyDown: handleKeyDown, onClick: handleClick };
};
