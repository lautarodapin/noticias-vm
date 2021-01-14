import React, { useEffect, useRef } from "react";

export function AlwaysScrollToBottom() {
	const elementRef = useRef();
	useEffect(() => elementRef.current.scrollIntoView());
	return <div ref={elementRef} />;
}
