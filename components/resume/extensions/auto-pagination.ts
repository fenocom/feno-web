import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

export const Pagination = Extension.create({
    name: "pagination",

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey("pagination"),
                view() {
                    return {
                        update(view, prevState) {
                            if (view.state.doc.eq(prevState.doc)) {
                                return;
                            }

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

    const pages: { node: any; pos: number; dom: HTMLElement }[] = [];
    view.state.doc.descendants((node: any, pos: number) => {
        if (node.type.name === "page") {
            const dom = view.nodeDOM(pos) as HTMLElement;
            if (dom) {
                pages.push({ node, pos, dom });
            }
            return false;
        }
    });

    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        
        const format = page.node.attrs.format;
        let maxHeightMm = 297;
        if (format === "a3") maxHeightMm = 420;
        if (format === "a5") maxHeightMm = 210;
        
        const PIXELS_PER_MM = 3.7795275591;
        const targetHeightPx = maxHeightMm * PIXELS_PER_MM;
        
        const currentHeight = page.dom.offsetHeight;
        
        if (currentHeight > targetHeightPx + 10) {
            
            const lastChild = page.node.lastChild;
            if (!lastChild) continue;
            
            const lastChildSize = lastChild.nodeSize;
            const lastChildPos = page.pos + 1 + page.node.content.size - lastChildSize;
            
            const tr = view.state.tr;
            
            tr.delete(lastChildPos, lastChildPos + lastChildSize);
            
            if (i < pages.length - 1) {
                const nextPage = pages[i + 1];
                const nextPagePos = tr.mapping.map(nextPage.pos);
                tr.insert(nextPagePos + 1, lastChild);
            } else {
                const pageEndPos = tr.mapping.map(page.pos + page.node.nodeSize);
                
                const newPage = view.state.schema.nodes.page.create(
                    page.node.attrs,
                    lastChild
                );
                
                tr.insert(pageEndPos, newPage);
            }
            
            view.dispatch(tr);
            return;
        }
    }
}
