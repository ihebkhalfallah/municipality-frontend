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
import { getDemandes, deleteDemande, updateDemande } from 'src/services/demandeService';
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
import DemandeFilter, { DEMANDE_TYPE } from './DemandeFilter';
import { STATUS } from 'src/types/apps/status';
import { useSelector } from 'src/store/Store';
import { AppState } from 'src/store/Store';

interface Demande {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
  type: DEMANDE_TYPE;
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

const DemandeView = () => {
  const { t } = useTranslation();
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalDemandes, setTotalDemandes] = useState(0);
  const [selectedDemande, setSelectedDemande] = useState<Demande | null>(null);
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

  const fetchDemandes = useCallback(
    async (filters = {}) => {
      try {
        const response = await getDemandes(page + 1, rowsPerPage, filters);
        setDemandes(response.data);
        setTotalDemandes(response.total);
      } catch (error) {
        console.error('Error fetching demandes:', error);
        setAlert({ message: t('ErrorFetchingDemandes'), severity: 'error' });
      }
    },
    [page, rowsPerPage, t],
  );

  const fetchComments = useCallback(
    async (demandeId: number) => {
      try {
        const response = await getComments({ demandeId });
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
        setAlert({ message: t('ErrorFetchingComments'), severity: 'error' });
      }
    },
    [t],
  );

  const fetchDocuments = useCallback(
    async (demandeId: number) => {
      try {
        const response = await getDocumentsByEntity('demande', demandeId);
        setDocuments(response);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setAlert({ message: t('ErrorFetchingDocuments'), severity: 'error' });
      }
    },
    [t],
  );

  useEffect(() => {
    fetchDemandes();
  }, [fetchDemandes]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDemande = (demande: Demande) => {
    setSelectedDemande(demande);
    fetchComments(demande.id);
    fetchDocuments(demande.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDemande(null);
    setComments([]);
    setDocuments([]);
  };

  const handleDeleteDemande = async (id: number) => {
    try {
      await deleteDemande(id);
      fetchDemandes();
      setAlert({ message: t('DemandeDeletedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error deleting demande:', error);
      setAlert({ message: t('ErrorDeletingDemande'), severity: 'error' });
    }
  };

  const handleAcceptDemande = async (id: number) => {
    try {
      await updateDemande(id, { status: STATUS.ACCEPTED });
      fetchDemandes();
      setAlert({ message: t('DemandeAcceptedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error accepting demande:', error);
      setAlert({ message: t('ErrorAcceptingDemande'), severity: 'error' });
    }
  };

  const handleRejectDemande = async (id: number) => {
    try {
      await updateDemande(id, { status: STATUS.REJECTED });
      fetchDemandes();
      setAlert({ message: t('DemandeRejectedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error rejecting demande:', error);
      setAlert({ message: t('ErrorRejectingDemande'), severity: 'error' });
    }
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      const newComment = await addComment('demande', selectedDemande?.id || 0, comment);
      if (files.length > 0) {
        await uploadDocuments('comment', newComment.id, files);
      }
      setComment('');
      setFiles([]);
      fetchComments(selectedDemande?.id || 0);
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
      if (selectedDemande) {
        await uploadDocuments('demande', selectedDemande.id, files);
        fetchDocuments(selectedDemande.id);
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
      if (selectedDemande) {
        fetchDocuments(selectedDemande.id);
      }
      setAlert({ message: t('DocumentDeletedSuccessfully'), severity: 'success' });
    } catch (error) {
      console.error('Error deleting document:', error);
      setAlert({ message: t('ErrorDeletingDocument'), severity: 'error' });
    }
  };

  const handleFilter = (filters: any) => {
    fetchDemandes(filters);
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
      <Typography variant="h4" gutterBottom>
        {t('Demandes')}
      </Typography>
      <DemandeFilter onFilter={handleFilter} />
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
                {t('Location')}
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
            {demandes.map((demande, index) => (
              <TableRow
                key={demande.id}
                style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}
              >
                <TableCell align="center">{demande.name}</TableCell>
                <TableCell align="center">{demande.description}</TableCell>
                <TableCell align="center">{demande.location}</TableCell>
                <TableCell align="center">{new Date(demande.date).toLocaleString()}</TableCell>
                <TableCell align="center">{t(demande.type)}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={getTranslatedStatus(demande.status)}
                    color={
                      demande.status === STATUS.ACCEPTED
                        ? 'success'
                        : demande.status === STATUS.REJECTED
                        ? 'error'
                        : 'warning'
                    }
                    sx={{ minWidth: 100 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1}>
                    <Tooltip title={t('View Demande')}>
                      <IconButton onClick={() => handleViewDemande(demande)}>
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('Delete Demande')}>
                      <IconButton onClick={() => handleDeleteDemande(demande.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('Accept Demande')}>
                      <IconButton onClick={() => handleAcceptDemande(demande.id)}>
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
          count={totalDemandes}
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
              return `${from}-${to} ${t('of')} ${count !== -1 ? count : `${t('more than')} ${to}`}`;
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

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth sx={{ zIndex: 1300 }}>
        <DialogTitle sx={{ fontWeight: 600 }}>{t('Demande Details')}</DialogTitle>
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
                {selectedDemande?.name}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Description')}:</strong> {selectedDemande?.description}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Location')}:</strong> {selectedDemande?.location}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Date')}:</strong>{' '}
                {new Date(selectedDemande?.date || '').toLocaleString()}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Type')}:</strong> {selectedDemande?.type ? t(selectedDemande.type) : ''}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                <strong>{t('Status')}:</strong>{' '}
                {selectedDemande?.status ? t(selectedDemande.status) : ''}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {t('Created By')}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box>
                  <Typography variant="body1" color="textSecondary">
                    <strong>{t('Name')}:</strong> {selectedDemande?.createdBy?.firstName}{' '}
                    {selectedDemande?.createdBy?.lastName}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>{t('Email')}:</strong> {selectedDemande?.createdBy.email}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>{t('Phone')}:</strong> {selectedDemande?.createdBy.phoneNumber}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    <strong>{t('Job')}:</strong> {selectedDemande?.createdBy.job}
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
            onClick={() => handleDownloadAllDocuments('demande', selectedDemande?.id || 0)}
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
            onClick={() => handleAcceptDemande(selectedDemande?.id || 0)}
            variant="contained"
            color="primary"
          >
            {t('Accept')}
          </Button>
          <Button
            onClick={() => handleRejectDemande(selectedDemande?.id || 0)}
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

export default DemandeView;
