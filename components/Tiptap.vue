<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import type { Content } from '@tiptap/core'

const props = defineProps({
  readOnly: {
    type: Boolean,
    default: false,
  },
})

const modelValue = defineModel<Content>()

const editor = useEditor({
  extensions: [
    StarterKit,
    Placeholder.configure({
      placeholder: '당신만의 글을 써보세요...',
    }),
  ],
  content: modelValue.value,
  editable: !props.readOnly,
  onUpdate({ editor }) {
    modelValue.value = editor.getJSON()
  },
  editorProps: {
    attributes: {
      class: 'prose max-w-none dark:prose-invert prose-sm sm:prose-base lg:prose-lg prose-base focus:outline-none',
    },
  },
})
</script>

<template>
  <EditorContent
    :editor="editor"
    :class="[!props.readOnly && 'm-5']"
  />
</template>

<style>
/* Placeholder (on every new line) */
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #78716c9c;
  pointer-events: none;
  height: 0;
}
</style>
