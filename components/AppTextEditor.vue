<template>
  <div class="tiptap-editor">
    <div>
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light pl-10 pt-10 pb-10"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <!--  -->
          <li class="nav-item">
            <div class="dropdown d-inline">
              <button
                class="btn btn-outline-primary btn-sm ml-5"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fa fa-heading"></i>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <a
                    class="dropdown-item"
                    @click="
                      editor.chain().focus().toggleHeading({ level: 1 }).run()
                    "
                    >H1</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    @click="
                      editor.chain().focus().toggleHeading({ level: 2 }).run()
                    "
                    >H2</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    @click="
                      editor.chain().focus().toggleHeading({ level: 3 }).run()
                    "
                    >H3</a
                  >
                </li>
              </ul>
            </div>
            <button
              v-for="(ta, index) in textActions"
              :key="index"
              @click="onActionClick(ta.slug, ta.option)"
              class="btn btn-outline-primary btn-sm ml-5"
            >
              <i :class="ta.icon"></i>
            </button>

            <div class="d-inline" style="">
              <input
                type="color"
                @input="
                  editor.chain().focus().setColor($event.target.value).run()
                "
                style="height: 20px; width: 25px; padding-top: 1px !important"
                class="ml-5 text-bottom"
              />
            </div>
          </li>
        </ul>
      </nav>
    </div>
    <div style="border: solid #efefef; min-height: 250px" class="p-3">
      <editor-content :editor="editor" />
    </div>
  </div>
</template>

<script>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";

export default {
  components: {
    EditorContent,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    maxLimit: {
      type: Number,
      default: null,
    },
  },

  //   data() {
  //     return {
  //       editor: null,
  //     };
  //   },

  setup() {
    const textActions = [
      { slug: "bold", icon: "fa fa-bold", active: "bold" },
      { slug: "italic", icon: "fa fa-italic", active: "italic" },
      { slug: "underline", icon: "fa fa-underline", active: "underline" },
      { slug: "strike", icon: "fa fa-strikethrough", active: "strike" },
      { slug: "heading", icon: "fa fa-heading", active: "h1" },
      {
        slug: "align",
        option: "left",
        icon: "fa fa-align-left",
        active: { textAlign: "left" },
      },
      {
        slug: "align",
        option: "center",
        icon: "fa fa-align-center",
        active: { textAlign: "center" },
      },
      {
        slug: "align",
        option: "right",
        icon: "fa fa-align-right",
        active: { textAlign: "right" },
      },
      {
        slug: "align",
        option: "justify",
        icon: "fa fa-align-justify",
        active: { textAlign: "justify" },
      },
      {
        slug: "bulletList",
        icon: "fa fa-list",
        active: "bulletList",
      },
      {
        slug: "orderedList",
        icon: "fa fa-list-ol",
        active: "orderedList",
      },
      { slug: "undo", icon: "fa fa-rotate-left", active: "undo" },
      { slug: "redo", icon: "fa fa-rotate-right", active: "redo" },
      { slug: "clear", icon: "fa fa-eraser", active: "clear" },
      { slug: "code", icon: "fa-brands fa-codepen", active: "code" },
    ];

    const editor = useEditor({
      content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
      extensions: [
        StarterKit,
        Underline,
        Color,
        Document,
        Paragraph,
        Text,
        TextStyle,
        Color,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
      ],
    });
    return { editor, textActions };
  },


  methods: {
    onActionClick(slug, option = null) {
      const vm = this.editor.chain().focus();
      const actionTriggers = {
        bold: () => vm.toggleBold().run(),
        italic: () => vm.toggleItalic().run(),
        underline: () => vm.toggleUnderline().run(),
        strike: () => vm.toggleStrike().run(),
        bulletList: () => vm.toggleBulletList().run(),
        orderedList: () => vm.toggleOrderedList().run(),
        align: () => vm.setTextAlign(option).run(),
        subscript: () => vm.toggleSubscript().run(),
        superscript: () => vm.toggleSuperscript().run(),
        heading: () => vm.toggleHeading({ level: 1 }).run(),
        undo: () => vm.undo().run(),
        redo: () => vm.redo().run(),
        clear: () => {
          vm.clearNodes().run();
          vm.unsetAllMarks().run();
        },
        code: () => vm.toggleCodeBlock().run(),
      };

      actionTriggers[slug]();
    },
    onHeadingClick(index) {
      const vm = this.editor.chain().focus();
      vm.toggleHeading({ level: index }).run();
    },
  },

  //   mounted() {
  //     this.editor = new useEditor({
  //       content: "<p>I’m running Tiptap with Vue.js. 🎉</p>",
  //       extensions: [StarterKit],
  //     });
  //   },

  //   beforeDestroy() {
  //     this.editor.destroy();
  //   },
};
</script>

<style lang="scss">
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }
}
</style>
