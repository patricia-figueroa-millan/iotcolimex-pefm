import { Title } from "@mantine/core"
import { useForm } from '@mantine/form';
import { TextInput, Button, Group, Box } from '@mantine/core';
import { randomId } from '@mantine/hooks';

function test() {
    <Title order={1}>LOG IN</Title>
    const form = useForm({
      initialValues: {
        name: '',
        email: '',
      },
    });
  
    return (
      <Box maw={320} mx="auto">
        <TextInput label="Name" placeholder="Name" {...form.getInputProps('name')} />
        <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
  
        <Group position="center" mt="xl">
          <Button
            variant="outline"
            onClick={() =>
              form.setValues({
                name: randomId(),
                email: `${randomId()}@test.com`,
              })
            }
          >
            Set random values
          </Button>
        </Group>
      </Box>
    );
  }

  export default test