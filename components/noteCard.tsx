'use client';

import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

interface NoteCardProps {
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, description, onEdit, onDelete }) => {
  return (
    <Card sx={{ minHeight: 150, boxShadow: 3, transition: '0.2s', '&:hover': { boxShadow: 6 } }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onEdit} color="primary">
          Edit
        </Button>
        <Button size="small" onClick={onDelete} color="error">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default NoteCard;
