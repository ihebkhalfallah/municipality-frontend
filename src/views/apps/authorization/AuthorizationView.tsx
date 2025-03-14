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
  createTheme,
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
import {
  getAuthorizations,
  deleteAuthorization,
  updateAuthorization,
} from 'src/services/authorizationService';
import AuthorizationFilter from './AuthorizationFilter';
import { STATUS } from 'src/types/apps/status';
import { useSelector } from 'src/store/Store';
import { AppState } from 'src/store/Store';

interface Authorization {
  id: number;
  name: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
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

const AuthorizationView = () => {
  const { t } = useTranslation();
  const [authorizations, setAuthorizations] = useState<Authorization[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalAuthorizations, setTotalAuthorizations] = useState(0);
  const [selectedAuthorization, setSelectedAuthorization] = useState<Authorization | null>(null);
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

  const fetchAuthorizations = useCallback(
    async (filters = {}) => {
      try {
        const response = await getAuthorizations(page + 1, rowsPerPage, filters);
        setAuthorizations(response.data);
        setTotalAuthorizations(response.total);
      } catch (error) {
        console.error('Error fetching authorizations:', error);
        setAlert({ message: t('ErrorFetchingAuthorizations'), severity: 'error' });
      }
    },
    [page, rowsPerPage],
  );

  const fetchComments = useCallback(async (authorizationId: number) => {
    try {
      const response = await getComments({ authorizationId });
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setAlert({ message: t('ErrorFetchingComments'), severity: 'error' });
    }
  }, []);

  const fetchDocuments = useCallback(async (authorizationId: number) => {
    try {
      const response = await getDocumentsByEntity('authorization', authorizationId);
      setDocuments(response);
    } catch (error) {
      console.error('Error fetching documents:', error);
      setAlert({ message: t('ErrorFetchingDocuments'), severity: 'error' });
    }
  }, []);

  useEffect(() => {
    fetchAuthorizations();
  }, [fetchAuthorizations]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewAuthorization = (authorization: Authorization) => {
    setSelectedAuthorization(authorization);
    fetchComments(authorization.id);
    fetchDocuments(authorization.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAuthorization(null);
    setComments([]);
    setDocuments([]);
  };

  const handleDeleteAuthorization = async (id: number) => {
    try {
      await deleteAuthorization(id);
      fetchAuthorizations();
      setAlert({ message: t('AuthorizationDeletedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error deleting authorization:', error);
      setAlert({ message: t('ErrorDeletingAuthorization'), severity: 'error' });
    }
  };

  const handleAcceptAuthorization = async (id: number) => {
    try {
      await updateAuthorization(id, { status: STATUS.ACCEPTED });
      fetchAuthorizations();
      setAlert({ message: t('AuthorizationAcceptedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error accepting authorization:', error);
      setAlert({ message: t('ErrorAcceptingAuthorization'), severity: 'error' });
    }
  };

  const handleRejectAuthorization = async (id: number) => {
    try {
      await updateAuthorization(id, { status: STATUS.REJECTED });
      fetchAuthorizations();
      setAlert({ message: t('AuthorizationRejectedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error rejecting authorization:', error);
      setAlert({ message: t('ErrorRejectingAuthorization'), severity: 'error' });
    }
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      const newComment = await addComment('authorization', selectedAuthorization?.id || 0, comment);
      if (files.length > 0) {
        await uploadDocuments('comment', newComment.id, files);
      }
      setComment('');
      setFiles([]);
      fetchComments(selectedAuthorization?.id || 0);
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
      if (selectedAuthorization) {
        await uploadDocuments('authorization', selectedAuthorization.id, files);
        fetchDocuments(selectedAuthorization.id);
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
      if (selectedAuthorization) {
        fetchDocuments(selectedAuthorization.id);
      }
      setAlert({ message: t('DocumentDeletedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error deleting document:', error);
      setAlert({ message: t('ErrorDeletingDocument'), severity: 'error' });
    }
  };

  const handleFilter = (filters: any) => {
    fetchAuthorizations(filters);
  };
  const getTranslatedStatus = (status: STATUS) => {
    const statusMap: Record<STATUS, string> = {
      [STATUS.PENDING]: t('Pending'),
      [STATUS.ACCEPTED]: t('Accepted'),
      [STATUS.REJECTED]: t('Rejected'),
    };
    return statusMap[status] || status;
  };

  const theme = createTheme({
    direction: customizer.isLanguage === 'ar' ? 'rtl' : 'ltr',
  });
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom dir={direction}>
        {t('Authorizations')}
      </Typography>
      <AuthorizationFilter onFilter={handleFilter} />
      <TableContainer component={Paper}>
        <Table dir={direction}>
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
                {t('Start Date')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', color: '#555', fontSize: '16px' }}
                align="center"
              >
                {t('End Date')}
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
            {authorizations.map((authorization, index) => (
              <TableRow
                key={authorization.id}
                style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}
              >
                <TableCell>{authorization.name}</TableCell>
                <TableCell>{authorization.description}</TableCell>
                <TableCell>{authorization.location}</TableCell>
                <TableCell>{new Date(authorization.start_date).toLocaleString()}</TableCell>
                <TableCell>{new Date(authorization.end_date).toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={getTranslatedStatus(authorization.status)}
                    color={
                      authorization.status === STATUS.ACCEPTED
                        ? 'success'
                        : authorization.status === STATUS.REJECTED
                        ? 'error'
                        : 'warning'
                    }
                    sx={{ minWidth: 100 }}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title={t('View Authorization')}>
                      <IconButton onClick={() => handleViewAuthorization(authorization)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('Delete Authorization')}>
                      <IconButton onClick={() => handleDeleteAuthorization(authorization.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('Accept Authorization')}>
                      <IconButton onClick={() => handleAcceptAuthorization(authorization.id)}>
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
          count={totalAuthorizations}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={t('rows per page')}
          labelDisplayedRows={({ from, to, count }) => {
            if (direction === 'rtl') {
              // For RTL languages (e.g., Arabic), reverse the `from` and `to` values
              return ` ${count !== -1 ? count : `${t('more than')} ${to}`} ${t(
                'of',
              )} ${to}-${from}`;
            } else {
              // For LTR languages, use the default format "1-5 of 9"
              return `${from}-${to} ${t('of')} ${count !== -1 ? count : `${t('more than')} ${to}`}`;
            }
          }}
          dir={direction}
          sx={{
            '& .MuiTablePagination-actions': {
              flexDirection: direction === 'rtl' ? 'row-reverse' : 'row', // Reverse the order of buttons for RTL
            },
            '& .MuiTablePagination-actions .MuiIconButton-root': {
              transform: direction === 'rtl' ? 'scaleX(-1)' : 'none', // Flip the icons horizontally for RTL
            },
          }}
        />
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={{ zIndex: 1300 }}>
        <DialogTitle sx={{ fontWeight: 600 }}>{t('Authorization Details')}</DialogTitle>
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
                {selectedAuthorization?.name}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Description')}:</strong> {selectedAuthorization?.description}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Location')}:</strong> {selectedAuthorization?.location}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Start Date')}:</strong>{' '}
                {new Date(selectedAuthorization?.start_date || '').toLocaleString()}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('End Date')}:</strong>{' '}
                {new Date(selectedAuthorization?.end_date || '').toLocaleString()}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Status')}:</strong>{' '}
                {selectedAuthorization?.status ? t(selectedAuthorization.status) : ''}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {t('Created By')}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box>
                  <Typography variant="body1" color="textSecondary">
                    <strong>{t('Name')}:</strong> {selectedAuthorization?.createdBy?.firstName}{' '}
                    {selectedAuthorization?.createdBy?.lastName}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>{t('Email')}:</strong> {selectedAuthorization?.createdBy.email}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>{t('Phone')}:</strong> {selectedAuthorization?.createdBy.phoneNumber}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>{t('Job')}:</strong> {selectedAuthorization?.createdBy.job}
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
            onClick={() =>
              handleDownloadAllDocuments('authorization', selectedAuthorization?.id || 0)
            }
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
            onClick={() => handleAcceptAuthorization(selectedAuthorization?.id || 0)}
            variant="contained"
            color="primary"
          >
            {t('Accept')}
          </Button>
          <Button
            onClick={() => handleRejectAuthorization(selectedAuthorization?.id || 0)}
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

export default AuthorizationView;
