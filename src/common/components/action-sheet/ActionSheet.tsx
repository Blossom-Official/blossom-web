'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ComponentProps, PropsWithChildren } from 'react';

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ActionSheet({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ActionSheetProps>) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            animate={isOpen ? 'visible' : 'hidden'}
            aria-hidden='true'
            className='fixed inset-0 bg-black'
            exit={{ opacity: 0 }}
            id='bottomSheetBackdrop'
            initial='hidden'
            style={{ zIndex: 1499 }}
            transition={{
              type: 'spring',
              damping: 40,
              stiffness: 400,
            }}
            variants={{
              visible: { opacity: 0.5 },
              hidden: { opacity: 0 },
            }}
            onClick={onClose}
          />
          <div
            aria-modal={isOpen}
            className='fixed inset-x-0 bottom-0 top-auto flex justify-center pb-[calc(env(safe-area-inset-bottom)+4rem)]'
            style={{
              zIndex: 1500,
            }}
          >
            <motion.nav
              animate={isOpen ? 'visible' : 'hidden'}
              className='w-[calc(min(100vw,44rem)-3.6rem)] divide-y divide-solid divide-gray-200 rounded-10 bg-white'
              exit={{ y: '120%' }}
              initial='hidden'
              transition={{
                type: 'spring',
                damping: 40,
                stiffness: 400,
              }}
              variants={{
                visible: { y: 0 },
                hidden: { y: '120%' },
              }}
            >
              {children}
            </motion.nav>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

type ActionSheetButtonProps = ComponentProps<'button'>;
const ActionSheetButton = ({
  children,
  className = '',
  ...rest
}: PropsWithChildren<ActionSheetButtonProps>) => {
  return (
    <button
      className={clsx(
        'h-63 w-full first:rounded-t-10 last:rounded-b-10 hover:bg-gray-100 active:bg-gray-100',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

ActionSheet.Button = ActionSheetButton;
