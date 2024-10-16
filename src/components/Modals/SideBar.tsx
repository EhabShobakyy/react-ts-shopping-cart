import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { RootState } from "../redux/Store";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import ModalCards from "../ModalsCard/ModalsCards";

const style = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  width: "450px",
  bgcolor: "background.paper",
  border: "1px solid #1976d2",
  overflowY: "auto",
  boxShadow: 24,
  p: 4,
};

interface CartModalProps {
  modalOpen: boolean; // Receiving modalOpen prop
  handleModalClose: () => void; // Receiving handleModalClose prop
}

export default function CartModal({
  modalOpen,
  handleModalClose,
}: CartModalProps) {
  // GET SELECTED OR UPDATED FROM STORE
  const selectedProduct = useSelector((state: RootState) => state.counter);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={modalOpen} // Use the modalOpen prop to control visibility
      onClose={handleModalClose} // Use the handleModalClose prop to close the modal
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={modalOpen}>
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "35px",
            }}
          >
            <Button
              onClick={handleModalClose}
              sx={{
                mt: 2,
                border: "1px solid",
                borderRadius: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CloseIcon />
            </Button>
          </div>
          <Box>
            {Object.values(selectedProduct.items).map((item) => (
              <ModalCards {...item} />
            ))}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
