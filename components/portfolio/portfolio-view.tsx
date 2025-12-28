"use client";

import { motion } from "framer-motion";
import {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import type { SelectedElement } from "./bubble-menu";
import type { DeviceType } from "./portfolio-page";

export interface SelectedSection {
    index: number;
    html: string;
}

export interface PortfolioViewHandle {
    applyStyle: (property: string, value: string) => void;
    getUpdatedHtml: () => Promise<string>;
}

interface PortfolioViewProps {
    html: string;
    device: DeviceType;
    selectorMode?: boolean;
    onSectionSelect?: (section: SelectedSection | null) => void;
    editMode?: boolean;
    onElementSelect?: (element: SelectedElement | null) => void;
    onHtmlUpdate?: (html: string) => void;
}

const deviceWidths: Record<DeviceType, string> = {
    desktop: "100%",
    tablet: "768px",
    mobile: "375px",
};

const SELECTOR_SCRIPT = `
(function() {
    let selectedSection = null;
    const style = document.createElement('style');
    style.textContent = \`
        .feno-section { transition: outline 0.15s ease, box-shadow 0.15s ease; cursor: pointer; }
        .feno-section:hover { outline: 2px dashed #3b82f6; outline-offset: 2px; }
        .feno-section.feno-selected { outline: 2px solid #3b82f6; outline-offset: 2px; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2); }
    \`;
    document.head.appendChild(style);

    document.querySelectorAll('.feno-section').forEach((section, index) => {
        section.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            document.querySelectorAll('.feno-section').forEach(s => s.classList.remove('feno-selected'));
            section.classList.add('feno-selected');
            selectedSection = { index, html: section.outerHTML };
            window.parent.postMessage({ type: 'feno-section-selected', section: selectedSection }, '*');
        });
    });

    window.addEventListener('message', (e) => {
        if (e.data?.type === 'feno-clear-selection') {
            document.querySelectorAll('.feno-section').forEach(s => s.classList.remove('feno-selected'));
            selectedSection = null;
        }
    });
})();
`;

const EDIT_MODE_SCRIPT = `
(function() {
    let selectedElement = null;
    let elementPath = null;

    const style = document.createElement('style');
    style.textContent = \`
        .feno-edit-hover { outline: 2px dashed #8b5cf6 !important; outline-offset: 2px; cursor: pointer; }
        .feno-edit-selected { outline: 2px solid #8b5cf6 !important; outline-offset: 2px; box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.2) !important; }
    \`;
    document.head.appendChild(style);

    function getElementPath(el) {
        const path = [];
        while (el && el !== document.body) {
            let selector = el.tagName.toLowerCase();
            if (el.id) {
                selector += '#' + el.id;
            } else {
                const siblings = Array.from(el.parentNode?.children || []);
                const index = siblings.filter(s => s.tagName === el.tagName).indexOf(el);
                if (index > 0) selector += ':nth-of-type(' + (index + 1) + ')';
            }
            path.unshift(selector);
            el = el.parentNode;
        }
        return path.join(' > ');
    }

    function getComputedStyles(el) {
        const computed = window.getComputedStyle(el);
        return {
            fontSize: computed.fontSize,
            fontFamily: computed.fontFamily,
            fontWeight: computed.fontWeight,
            fontStyle: computed.fontStyle,
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            textAlign: computed.textAlign,
            paddingTop: computed.paddingTop,
            paddingRight: computed.paddingRight,
            paddingBottom: computed.paddingBottom,
            paddingLeft: computed.paddingLeft,
            marginTop: computed.marginTop,
            marginRight: computed.marginRight,
            marginBottom: computed.marginBottom,
            marginLeft: computed.marginLeft,
        };
    }

    function rgbToHex(rgb) {
        if (!rgb || rgb === 'transparent' || rgb === 'rgba(0, 0, 0, 0)') return 'transparent';
        const match = rgb.match(/^rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/);
        if (!match) return rgb;
        return '#' + [match[1], match[2], match[3]].map(x => {
            const hex = parseInt(x).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    document.body.addEventListener('mouseover', (e) => {
        if (e.target === document.body) return;
        document.querySelectorAll('.feno-edit-hover').forEach(el => el.classList.remove('feno-edit-hover'));
        if (!e.target.classList.contains('feno-edit-selected')) {
            e.target.classList.add('feno-edit-hover');
        }
    });

    document.body.addEventListener('mouseout', (e) => {
        e.target.classList.remove('feno-edit-hover');
    });

    document.body.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        document.querySelectorAll('.feno-edit-selected').forEach(el => el.classList.remove('feno-edit-selected'));
        e.target.classList.remove('feno-edit-hover');
        e.target.classList.add('feno-edit-selected');

        selectedElement = e.target;
        elementPath = getElementPath(e.target);

        const rect = e.target.getBoundingClientRect();
        const styles = getComputedStyles(e.target);

        // Convert RGB colors to hex
        styles.color = rgbToHex(styles.color);
        styles.backgroundColor = rgbToHex(styles.backgroundColor);

        window.parent.postMessage({
            type: 'feno-element-selected',
            element: {
                path: elementPath,
                tagName: e.target.tagName.toLowerCase(),
                styles: styles,
                rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
            }
        }, '*');
    }, true);

    window.addEventListener('message', (e) => {
        if (e.data?.type === 'feno-clear-element') {
            document.querySelectorAll('.feno-edit-selected, .feno-edit-hover').forEach(el => {
                el.classList.remove('feno-edit-selected', 'feno-edit-hover');
            });
            selectedElement = null;
            elementPath = null;
        }

        if (e.data?.type === 'feno-apply-style' && selectedElement) {
            const { property, value } = e.data;
            selectedElement.style[property] = value;

            // Send updated HTML back to parent
            window.parent.postMessage({
                type: 'feno-html-updated',
                html: document.documentElement.outerHTML
            }, '*');
        }
    });
})();
`;

export const PortfolioView = forwardRef<
    PortfolioViewHandle,
    PortfolioViewProps
>(function PortfolioView(
    {
        html,
        device,
        selectorMode,
        onSectionSelect,
        editMode,
        onElementSelect,
        onHtmlUpdate,
    },
    ref,
) {
    const width = deviceWidths[device];
    const isFullWidth = device === "desktop";
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const getInjectedHtml = useCallback(() => {
        let result = html;
        if (selectorMode) {
            result = result.replace(
                "</body>",
                `<script>${SELECTOR_SCRIPT}</script></body>`,
            );
        }
        if (editMode) {
            result = result.replace(
                "</body>",
                `<script>${EDIT_MODE_SCRIPT}</script></body>`,
            );
        }
        return result;
    }, [html, selectorMode, editMode]);

    const handleMessage = useCallback(
        (event: MessageEvent) => {
            if (event.data?.type === "feno-section-selected") {
                onSectionSelect?.(event.data.section);
            }
            if (event.data?.type === "feno-element-selected") {
                onElementSelect?.(event.data.element);
            }
            if (event.data?.type === "feno-html-updated") {
                onHtmlUpdate?.(event.data.html);
            }
        },
        [onSectionSelect, onElementSelect, onHtmlUpdate],
    );

    useEffect(() => {
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [handleMessage]);

    useEffect(() => {
        if (!selectorMode && iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                { type: "feno-clear-selection" },
                "*",
            );
            onSectionSelect?.(null);
        }
    }, [selectorMode, onSectionSelect]);

    useEffect(() => {
        if (!editMode && iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                { type: "feno-clear-element" },
                "*",
            );
            onElementSelect?.(null);
        }
    }, [editMode, onElementSelect]);

    const applyStyle = useCallback((property: string, value: string) => {
        if (iframeRef.current?.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
                { type: "feno-apply-style", property, value },
                "*",
            );
        }
    }, []);

    const getUpdatedHtml = useCallback((): Promise<string> => {
        return new Promise((resolve) => {
            if (iframeRef.current?.contentWindow) {
                const doc = iframeRef.current.contentDocument;
                if (doc) {
                    resolve(
                        `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`,
                    );
                } else {
                    resolve(html);
                }
            } else {
                resolve(html);
            }
        });
    }, [html]);

    useImperativeHandle(
        ref,
        () => ({
            applyStyle,
            getUpdatedHtml,
        }),
        [applyStyle, getUpdatedHtml],
    );

    return (
        <div className="flex-1 w-full flex items-start justify-center py-6 pb-24 overflow-auto">
            <motion.div
                className="bg-white shadow-2xl overflow-hidden"
                initial={false}
                animate={{
                    width,
                    borderRadius: isFullWidth ? 0 : 16,
                }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                style={{
                    height: isFullWidth ? "100vh" : "auto",
                    minHeight: isFullWidth ? "100vh" : "80vh",
                }}
            >
                <iframe
                    ref={iframeRef}
                    srcDoc={getInjectedHtml()}
                    className="w-full h-full border-none"
                    style={{ minHeight: isFullWidth ? "100vh" : "80vh" }}
                    title="Portfolio Preview"
                />
            </motion.div>
        </div>
    );
});
