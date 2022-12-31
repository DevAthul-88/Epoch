import { Group, Text, Box, FileInput, FileButton, Button } from '@mantine/core'
import { useState } from 'react'

export function VideoUpload({ setVideo }) {

  const handleFileChange = (e) => {
    const file = e;
    const url = URL.createObjectURL(file);
    setVideo({url:url , file:e});
  }

  return (
    <Box>
      <Group
        mt="lg"
        position="center"
        spacing="xl"
        style={{
          minHeight: 220,
          border: '2px dashed black',
        }}
      >
        <div>
          <Text size="xl" inline>
             Click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
          <FileInput
           radius="md"
           size="md"
            mt="lg"
            placeholder="Pick video"
            label="Pick video"
            accept="video/*"
            onChange={handleFileChange}
            withAsterisk
          />
        </div>
      </Group>
    </Box>
  )
}
