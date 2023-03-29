import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import axios from "axios";

function MenuDishTab(props) {
  const { dish, selectedDishCategory, submitDeleteDishInMenu } = props;
  const [deleteWindowIsOpen, setDeleteWindowIsOpen] = useState(false);
  return (
    <Card className="display-tab">
      <CardMedia
        component="img"
        image={`/${dish.name}.jpeg`}
        sx={{ height: 120 }}
      ></CardMedia>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {dish.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {dish.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <IconButton onClick={() => setDeleteWindowIsOpen(!deleteWindowIsOpen)}>
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </CardActions>
      <Dialog
        open={deleteWindowIsOpen}
        onClose={() => setDeleteWindowIsOpen(!deleteWindowIsOpen)}
      >
        <DialogTitle>Are you sure to delete the dish?</DialogTitle>
        <DialogContent>
          The dish will be deleted from this menu but it will remain in the
          user's dish page.
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              submitDeleteDishInMenu(
                dish.id,
                selectedDishCategory.id,
                setDeleteWindowIsOpen
              )
            }
          >
            Yes
          </Button>
          <Button onClick={() => setDeleteWindowIsOpen(!deleteWindowIsOpen)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default MenuDishTab;
