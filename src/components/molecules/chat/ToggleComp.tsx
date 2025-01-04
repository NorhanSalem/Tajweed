import { Popover, Text, Button } from '@mantine/core';

export default function ToggleComp({ text, comp, style }: any) {
  return (
    <div>
      {' '}
      <Popover position='bottom' withArrow shadow='md'>
        <Popover.Target>
          <Button classNames={style}>{text}</Button>
        </Popover.Target>
        <Popover.Dropdown>
          <Text size='sm'>{comp}</Text>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}
