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
import { useSelector } from 'src/store/Store';
import { AppState } from 'src/store/Store';

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
  const customizer = useSelector((state: AppState) => state.customizer);
  const direction = customizer.isLanguage === 'ar' ? 'rtl' : 'ltr';

  const fetchEvents = useCallback(
    async (filters = {}) => {
      try {
        const response = await getEvents(page + 1, rowsPerPage, filters);
        setEvents(response.data);
        setTotalEvents(response.total);
      } catch (error) {
        console.error('Error fetching events:', error);
        setAlert({ message: t('ErrorFetchingEvents'), severity: 'error' });
      }
    },
    [page, rowsPerPage, t],
  );

  const fetchComments = useCallback(
    async (eventId: number) => {
      try {
        const response = await getComments({ eventId });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setAlert({ message: t('ErrorFetchingComments'), severity: 'error' });
      }
    },
    [t],
  );

  const fetchDocuments = useCallback(
    async (eventId: number) => {
      try {
        const response = await getDocumentsByEntity('event', eventId);
        setDocuments(response);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setAlert({ message: t('ErrorFetchingDocuments'), severity: 'error' });
      }
    },
    [t],
  );

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
      setAlert({ message: t('EventDeletedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error deleting event:', error);
      setAlert({ message: t('ErrorDeletingEvent'), severity: 'error' });
    }
  };

  const handleAcceptEvent = async (id: number) => {
    try {
      await updateEvent(id, { status: STATUS.ACCEPTED });
      fetchEvents();
      setAlert({ message: t('EventAcceptedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error accepting event:', error);
      setAlert({ message: t('ErrorAcceptingEvent'), severity: 'error' });
    }
  };

  const handleRejectEvent = async (id: number) => {
    try {
      await updateEvent(id, { status: STATUS.REJECTED });
      fetchEvents();
      setAlert({ message: t('EventRejectedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error rejecting event:', error);
      setAlert({ message: t('ErrorRejectingEvent'), severity: 'error' });
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
      setAlert({ message: t('CommentAddedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error adding comment:', error);
      setAlert({ message: t('ErrorAddingComment'), severity: 'error' });
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
        setAlert({ message: t('FilesUploadedSuccessfully'), severity: 'success' });
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
      setAlert({ message: t('ErrorDownloadingDocument'), severity: 'error' });
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
      setAlert({ message: t('ErrorDownloadingDocuments'), severity: 'error' });
    }
  };

  const handleDeleteDocument = async (documentId: number) => {
    try {
      await deleteDocument(documentId);
      if (selectedEvent) {
        fetchDocuments(selectedEvent.id);
      }
      setAlert({ message: t('DocumentDeletedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error deleting document:', error);
      setAlert({ message: t('ErrorDeletingDocument'), severity: 'error' });
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
    <Box p={3} dir={direction}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at top right, #f7f7f7 0%, transparent 60%)',
            zIndex: -1,
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            background: 'linear-gradient(45deg, #1976d2, #64b5f6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2,
          }}
        >
          {t('Events')}
        </Typography>

        <EventFilter onFilter={handleFilter} />

        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            '& .MuiTable-root': {
              borderCollapse: 'separate',
              borderSpacing: '0 8px',
            },
          }}
        >
          <Table dir={direction}>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '15px',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    backgroundColor: '#f8fafc',
                  }}
                  align="center"
                >
                  {t('Name')}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '15px',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    backgroundColor: '#f8fafc',
                  }}
                  align="center"
                >
                  {t('Description')}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '15px',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    backgroundColor: '#f8fafc',
                  }}
                  align="center"
                >
                  {t('Location')}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '15px',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    backgroundColor: '#f8fafc',
                  }}
                  align="center"
                >
                  {t('Date')}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '15px',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    backgroundColor: '#f8fafc',
                  }}
                  align="center"
                >
                  {t('Type')}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '15px',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    backgroundColor: '#f8fafc',
                  }}
                  align="center"
                >
                  {t('Status')}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    fontSize: '15px',
                    borderBottom: '2px solid',
                    borderColor: 'primary.light',
                    backgroundColor: '#f8fafc',
                  }}
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
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: '#f5f9ff',
                      transform: 'scale(1.01)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    },
                  }}
                >
                  <TableCell align="center">{event.name}</TableCell>
                  <TableCell align="center">{event.description}</TableCell>
                  <TableCell align="center">{event.location}</TableCell>
                  <TableCell align="center">{new Date(event.date).toLocaleString()}</TableCell>
                  <TableCell align="center">{t(event.type)}</TableCell>
                  <TableCell align="center">
                    <Chip
                      label={getTranslatedStatus(event.status)}
                      color={
                        event.status === STATUS.ACCEPTED
                          ? 'success'
                          : event.status === STATUS.REJECTED
                          ? 'error'
                          : 'warning'
                      }
                      sx={{
                        minWidth: 100,
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        '& .MuiChip-label': {
                          px: 2,
                          py: 0.5,
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Tooltip title={t('View Event')} arrow>
                        <IconButton
                          onClick={() => handleViewEvent(event)}
                          sx={{
                            backgroundColor: 'primary.light',
                            '&:hover': {
                              backgroundColor: 'primary.main',
                              '& svg': {
                                color: 'white',
                              },
                            },
                          }}
                        >
                          <VisibilityIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('Delete Event')} arrow>
                        <IconButton
                          onClick={() => handleDeleteEvent(event.id)}
                          sx={{
                            backgroundColor: 'error.light',
                            '&:hover': {
                              backgroundColor: 'error.main',
                              '& svg': {
                                color: 'white',
                              },
                            },
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('Accept Event')} arrow>
                        <IconButton
                          onClick={() => handleAcceptEvent(event.id)}
                          sx={{
                            backgroundColor: 'success.light',
                            '&:hover': {
                              backgroundColor: 'success.main',
                              '& svg': {
                                color: 'white',
                              },
                            },
                          }}
                        >
                          <CheckCircleIcon sx={{ fontSize: '1.1rem' }} />
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
            labelRowsPerPage={t('rows per page')}
            labelDisplayedRows={({ from, to, count }) => {
              if (direction === 'rtl') {
                return ` ${count !== -1 ? count : `${t('more than')} ${to}`} ${t(
                  'of',
                )} ${to}-${from}`;
              } else {
                return `${from}-${to} ${t('of')} ${
                  count !== -1 ? count : `${t('more than')} ${to}`
                }`;
              }
            }}
            dir={direction}
            sx={{
              '& .MuiTablePagination-actions': {
                flexDirection: direction === 'rtl' ? 'row-reverse' : 'row',
              },
              '& .MuiTablePagination-actions .MuiIconButton-root': {
                transform: direction === 'rtl' ? 'scaleX(-1)' : 'none',
              },
            }}
          />
        </TableContainer>
      </Box>
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
    </Box>
  );
};

export default EventView;
