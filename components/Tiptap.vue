<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import type { Content } from '@tiptap/core'

const modelValue = defineModel<Content>()

const editor = useEditor({
  extensions: [
    StarterKit,
  ],
  content: modelValue.value,
  onUpdate({ editor }) {
    modelValue.value = editor.getJSON()
  },
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
    },
  },
})
</script>

<template>
  <EditorContent
    :editor="editor"
    class="border border-gray-200 dark:border-gray-100/30 rounded-md"
  />
</template>
