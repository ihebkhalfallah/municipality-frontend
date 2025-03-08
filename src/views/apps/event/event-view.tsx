import React, { useEffect, useState, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Stack,
  Tooltip,
  Card,
  CardContent,
  Divider,
  ListItemIcon,
  Alert,
  Snackbar,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getComments, addComment } from 'src/services/commentService';
import {
  uploadDocuments,
  getDocumentsByEntity,
  downloadDocument,
  downloadDocumentsByEntity,
  deleteDocument,
} from 'src/services/documentService';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import EventFilter, { EVENT_TYPE } from './EventFilter';
import { deleteEvent, getEvents, updateEvent } from 'src/services/eventService';
import { STATUS } from 'src/types/apps/status';

// export enum EVENT_STATUS {
//   PENDING = 'PENDING',
//   ACCEPTED = 'ACCEPTED',
//   REJECTED = 'REJECTED',
// }

interface Event {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  type: EVENT_TYPE;
  status: STATUS;
  createdBy: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    job: string;
    profile_photo: string;
  };
}

interface Comment {
  id: number;
  commentText: string;
  createdAt: string;
  documents: Document[];
}

interface Document {
  id: number;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadDate: string;
}

const EventView = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalEvents, setTotalEvents] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [alert, setAlert] = useState<{
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  } | null>(null);

  const fetchEvents = useCallback(
    async (filters = {}) => {
      try {
        const response = await getEvents(page + 1, rowsPerPage, filters);
        setEvents(response.data);
        setTotalEvents(response.total);
      } catch (error) {
        console.error('Error fetching events:', error);
        setAlert({ message: 'Error fetching events', severity: 'error' });
      }
    },
    [page, rowsPerPage],
  );

  const fetchComments = useCallback(async (eventId: number) => {
    try {
      const response = await getComments({ eventId });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setAlert({ message: 'Error fetching comments', severity: 'error' });
    }
  }, []);

  const fetchDocuments = useCallback(async (eventId: number) => {
    try {
      const response = await getDocumentsByEntity('event', eventId);
      setDocuments(response);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setAlert({ message: 'Error fetching documents', severity: 'error' });
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewEvent = (event: Event) => {
    setSelectedEvent(event);
    fetchComments(event.id);
    fetchDocuments(event.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
    setComments([]);
    setDocuments([]);
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await deleteEvent(id);
      fetchEvents();
      setAlert({ message: 'Event deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting event:', error);
      setAlert({ message: 'Error deleting event', severity: 'error' });
    }
  };

  const handleAcceptEvent = async (id: number) => {
    try {
      await updateEvent(id, { status: STATUS.ACCEPTED });
      fetchEvents();
      setAlert({ message: 'Event accepted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error accepting event:', error);
      setAlert({ message: 'Error accepting event', severity: 'error' });
    }
  };

  const handleRejectEvent = async (id: number) => {
    try {
      await updateEvent(id, { status: STATUS.REJECTED });
      fetchEvents();
      setAlert({ message: 'Event rejected successfully', severity: 'success' });
    } catch (error) {
      console.error('Error rejecting event:', error);
      setAlert({ message: 'Error rejecting event', severity: 'error' });
    }
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      const newComment = await addComment('event', selectedEvent?.id || 0, comment);
      if (files.length > 0) {
        await uploadDocuments('comment', newComment.id, files);
      }
      setComment('');
      setFiles([]);
      fetchComments(selectedEvent?.id || 0);
      setAlert({ message: 'Comment added successfully', severity: 'success' });
    } catch (error) {
      console.error('Error adding comment:', error);
      setAlert({ message: 'Error adding comment', severity: 'error' });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUploadFiles = async () => {
    try {
      if (selectedEvent) {
        await uploadDocuments('event', selectedEvent.id, files);
        fetchDocuments(selectedEvent.id);
        setFiles([]);
        setAlert({ message: 'Files uploaded successfully', severity: 'success' });
      }
    } catch (error) {
      setAlert({ message: t('ErrorUploadingFiles'), severity: 'error' });
    }
  };

  const handleDownloadDocument = async (documentId: number) => {
    try {
      const { data, fileName } = await downloadDocument(documentId);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading document:', error);
      setAlert({ message: 'Error downloading document', severity: 'error' });
    }
  };

  const handleDownloadAllDocuments = async (entityType: string, entityId: number) => {
    try {
      const { data, fileName } = await downloadDocumentsByEntity(entityType, entityId);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading documents:', error);
      setAlert({ message: t('ErrorUploadingFiles'), severity: 'error' });
    }
  };

  const handleDeleteDocument = async (documentId: number) => {
    try {
      await deleteDocument(documentId);
      if (selectedEvent) {
        fetchDocuments(selectedEvent.id);
      }
      setAlert({ message: 'Document deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting document:', error);
      setAlert({ message: 'Error deleting document', severity: 'error' });
    }
  };

  const handleFilter = (filters: any) => {
    fetchEvents(filters);
  };

  const getTranslatedStatus = (status: STATUS) => {
    const statusMap: Record<STATUS, string> = {
      [STATUS.PENDING]: t('Pending'),
      [STATUS.ACCEPTED]: t('Accepted'),
      [STATUS.REJECTED]: t('Rejected'),
    };
    return statusMap[status] || status;
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        {t('Events')}
      </Typography>
      <EventFilter onFilter={handleFilter} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 'bold', color: '#555', fontSize: '16px' }}
                align="center"
              >
                {t('Name')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: '#555', fontSize: '16px' }}
                align="center"
              >
                {t('Description')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: '#555', fontSize: '16px' }}
                align="center"
              >
                {t('Location')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: '#555', fontSize: '16px' }}
                align="center"
              >
                {t('Date')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: '#555', fontSize: '16px' }}
                align="center"
              >
                {t('Type')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: '#555', fontSize: '16px' }}
                align="center"
              >
                {t('Status')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: '#555', fontSize: '16px' }}
                align="center"
              >
                {t('Actions')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, index) => (
              <TableRow
                key={event.id}
                style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}
              >
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{new Date(event.date).toLocaleString()}</TableCell>
                <TableCell>{t(event.type)}</TableCell>
                <TableCell>
                  <Chip
                    label={getTranslatedStatus(event.status)}
                    color={
                      event.status === STATUS.ACCEPTED
                        ? 'success'
                        : event.status === STATUS.REJECTED
                        ? 'error'
                        : 'warning'
                    }
                    sx={{ minWidth: 100 }}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title={t('View Event')}>
                      <IconButton onClick={() => handleViewEvent(event)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('Delete Event')}>
                      <IconButton onClick={() => handleDeleteEvent(event.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('Accept Event')}>
                      <IconButton onClick={() => handleAcceptEvent(event.id)}>
                        <CheckCircleIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalEvents}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={{ zIndex: 1300 }}>
        <DialogTitle sx={{ fontWeight: 600 }}>{t('Event Details')}</DialogTitle>
        <DialogContent sx={{ zIndex: 1300 }}>
          {alert && (
            <Snackbar
              open
              autoHideDuration={6000}
              onClose={() => setAlert(null)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              sx={{ zIndex: 9999 }}
            >
              <Alert
                variant="filled"
                onClose={() => setAlert(null)}
                severity={alert.severity}
                sx={{ width: '100%', zIndex: 9999 }}
              >
                {alert.message}
              </Alert>
            </Snackbar>
          )}

          <Card variant="outlined" sx={{ p: 2, mb: 2, zIndex: 1300 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {selectedEvent?.name}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Description')}:</strong> {selectedEvent?.description}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Location')}:</strong> {selectedEvent?.location}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Date')}:</strong> {new Date(selectedEvent?.date || '').toLocaleString()}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Type')}:</strong> {selectedEvent?.type ? t(selectedEvent.type) : ''}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Status')}:</strong>{' '}
                {selectedEvent?.status ? t(selectedEvent.status) : ''}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {t('Created By')}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box>
                  <Typography variant="body1" color="textSecondary">
                    <strong>{t('Name')}:</strong> {selectedEvent?.createdBy?.firstName}{' '}
                    {selectedEvent?.createdBy?.lastName}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>{t('Email')}:</strong> {selectedEvent?.createdBy.email}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>{t('Phone')}:</strong> {selectedEvent?.createdBy.phoneNumber}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>{t('Job')}:</strong> {selectedEvent?.createdBy.job}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <TextField
            label={t('Add Comment')}
            fullWidth
            value={comment}
            onChange={handleCommentChange}
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
            sx={{ mb: 2 }}
          />
          <Button onClick={handleAddComment} variant="contained" color="primary" sx={{ mt: 2 }}>
            {t('Add Comment')}
          </Button>

          <Typography variant="h6" fontWeight={600} gutterBottom>
            {t('Comments')}
          </Typography>
          <List sx={{ maxHeight: 200, overflowY: 'auto', bgcolor: 'background.paper' }}>
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <ListItem key={comment.id} alignItems="flex-start">
                  <ListItemText
                    primary={comment.commentText}
                    secondary={new Date(comment.createdAt).toLocaleString()}
                  />
                  {comment.documents &&
                    comment.documents.map((doc) => (
                      <Box key={doc.id} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" color="textSecondary">
                          {doc.fileName}
                        </Typography>
                        <Tooltip title={t('Download')}>
                          <IconButton onClick={() => handleDownloadDocument(doc.id)}>
                            <CloudDownloadIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    ))}
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ p: 2 }}>
                {t('No comments yet')}
              </Typography>
            )}
          </List>

          <Typography variant="h6" fontWeight={600} gutterBottom>
            {t('Documents')}
          </Typography>
          <input type="file" multiple onChange={handleFileChange} />
          <Button onClick={handleUploadFiles} variant="contained" color="primary" sx={{ mt: 2 }}>
            {t('Upload Files')}
          </Button>
          <Button
            onClick={() => handleDownloadAllDocuments('event', selectedEvent?.id || 0)}
            variant="contained"
            color="secondary"
            sx={{ mt: 2, ml: 2 }}
          >
            {t('Download All Files')}
          </Button>
          <List sx={{ maxHeight: 200, overflowY: 'auto', bgcolor: 'background.paper', mt: 2 }}>
            {documents && documents.length > 0 ? (
              documents.map((doc) => (
                <ListItem key={doc.id} alignItems="flex-start">
                  <ListItemIcon>
                    <AttachFileIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={doc.fileName}
                    secondary={`${doc.fileSize} bytes - ${new Date(
                      doc.uploadDate,
                    ).toLocaleString()}`}
                  />
                  <Tooltip title={t('Download')}>
                    <IconButton onClick={() => handleDownloadDocument(doc.id)}>
                      <CloudDownloadIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('Delete')}>
                    <IconButton onClick={() => handleDeleteDocument(doc.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary" sx={{ p: 2 }}>
                {t('No documents yet')}
              </Typography>
            )}
          </List>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            {t('Close')}
          </Button>
          <Button
            onClick={() => handleAcceptEvent(selectedEvent?.id || 0)}
            variant="contained"
            color="primary"
          >
            {t('Accept')}
          </Button>
          <Button
            onClick={() => handleRejectEvent(selectedEvent?.id || 0)}
            variant="contained"
            color="error"
          >
            {t('Reject')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventView;
