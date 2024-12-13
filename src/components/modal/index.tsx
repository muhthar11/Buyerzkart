import React from "react";
import { Backdrop, Box, Fade, Modal } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 325,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalContainer = ({
  isVisible,
  setIsVisible,
  deleteId,
  confirm,
}: any) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isVisible}
      onClose={() => setIsVisible(false)}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isVisible}>
        <Box sx={style}>
          <p className="text-md mb-4 w-full text-center font-bold text-navy-700 dark:text-white">
            Are you sure?
          </p>
          <div className="grid grid-cols-2 gap-8">
            <button
              className="linear mb-2 w-full rounded-xl border py-[5px] text-base text-sm font-bold text-navy-700 transition duration-200 hover:bg-gray-200 hover:text-navy-700 dark:!border-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:active:bg-white/10"
              type="button"
              onClick={() => {
                confirm(deleteId);
                setIsVisible(false);
              }}
            >
              {`Yes`}
            </button>
            <button
              className="linear mb-2 w-full rounded-xl bg-brand-500 py-[5px] text-base text-sm font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              type="button"
              onClick={() => setIsVisible(false)}
            >
              {`No`}
            </button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalContainer;
