import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

export const Pagination = Extension.create({
    name: "pagination",

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey("pagination"),
                view(editorView) {
                    return {
                        update(view, prevState) {
                            // Check if document changed
                            if (view.state.doc.eq(prevState.doc)) {
                                return;
                            }

                            // Debounce the pagination check to avoid performance issues
                            // and to allow the DOM to update first
                            setTimeout(() => {
                                checkPagination(view);
                            }, 100);
                        },
                    };
                },
            }),
        ];
    },
});

function checkPagination(view: any) {
    if (!view || !view.docView) return;

    // Iterate through all nodes to find pages
    const pages: { node: any; pos: number; dom: HTMLElement }[] = [];
    view.state.doc.descendants((node: any, pos: number) => {
        if (node.type.name === "page") {
            const dom = view.nodeDOM(pos) as HTMLElement;
            if (dom) {
                pages.push({ node, pos, dom });
            }
            return false; // Don't traverse children of page
        }
    });

    // Check each page for overflow
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const pageHeight = page.dom.clientHeight; // This includes padding
        
        // Use offsetHeight or scrollHeight. 
        // scrollHeight includes hidden overflow.
        // We set min-height in CSS, so clientHeight will be at least min-height.
        // If content overflows, scrollHeight > clientHeight (assuming overflow: hidden isn't strictly clipping measurement)
        // Actually, CSS has overflow: hidden, so scrollHeight might equal clientHeight in some browsers if clipped.
        // However, we can measure the children.
        
        // Better heuristic: Measure the last child's bottom position relative to page bottom.
        
        // Let's get the max height allowed based on format
        const format = page.node.attrs.format;
        let maxHeightMm = 297; // Default A4
        if (format === "a3") maxHeightMm = 420;
        if (format === "a5") maxHeightMm = 210;
        
        // Convert mm to pixels (approx 3.78 px/mm at 96 DPI)
        // But better to trust the CSS height if fixed?
        // The CSS sets min-height: 297mm.
        // If the element grows beyond that, we want to split.
        // So we can check if DOM height > target height.
        
        // We can get the computed style height for target
        // But since we use min-height, the element expands.
        // So we just check if the element's height is significantly larger than the target max height.
        // We add a small buffer (e.g. 5px) to avoid rounding errors flickering.
        
        // 1mm = 3.7795275591px
        const PIXELS_PER_MM = 3.7795275591;
        const targetHeightPx = maxHeightMm * PIXELS_PER_MM;
        
        const currentHeight = page.dom.offsetHeight; // offsetHeight includes padding + borders
        
        if (currentHeight > targetHeightPx + 10) { // 10px buffer
            // Overflow detected!
            // Find the split point.
            // We need to move the last block to the next page.
            // Just moving the last block is the simplest robust strategy for now.
            
            const lastChild = page.node.lastChild;
            if (!lastChild) continue;
            
            const lastChildSize = lastChild.nodeSize;
            // The position of the last child is:
            // Page start (page.pos) + 1 (open tag) + page.node.content.size - lastChildSize
            const lastChildPos = page.pos + 1 + page.node.content.size - lastChildSize;
            
            // Dispatch transaction to move this node
            const tr = view.state.tr;
            
            // Delete from current page
            tr.delete(lastChildPos, lastChildPos + lastChildSize);
            
            // Determine insertion point
            // If next page exists, insert at start of it.
            // If not, create new page with this content.
            
            if (i < pages.length - 1) {
                // Next page exists
                const nextPage = pages[i + 1];
                // Insert at the start of next page content
                // Next page pos is shifted because we deleted content before it?
                // Yes, existing positions are invalid after delete.
                // We should map the position or calculate relative.
                
                // Using mapping:
                const nextPagePos = tr.mapping.map(nextPage.pos);
                // Insert at start of next page: nextPagePos + 1
                tr.insert(nextPagePos + 1, lastChild);
            } else {
                // Create new page
                // Insert after the current page.
                // Current page end pos is mapped.
                const pageEndPos = tr.mapping.map(page.pos + page.node.nodeSize);
                
                const newPage = view.state.schema.nodes.page.create(
                    page.node.attrs, // Copy attributes (format, color)
                    lastChild // Content
                );
                
                tr.insert(pageEndPos, newPage);
            }
            
            view.dispatch(tr);
            return; // Only handle one overflow at a time to avoid conflicts. The next update will handle the rest.
        }
    }
}

