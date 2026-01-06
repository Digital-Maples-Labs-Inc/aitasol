import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DescriptionIcon from '@mui/icons-material/Description';
import Box from '@mui/material/Box';

export default function CustomizedTreeView() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography component="h3" variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          File Explorer
        </Typography>
        <Box sx={{ minHeight: 200 }}>
          <SimpleTreeView
            defaultExpandedItems={['1', '2']}
            sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
          >
            <TreeItem
              itemId="1"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FolderIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">Pages</Typography>
                </Box>
              }
            >
              <TreeItem
                itemId="1-1"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">Home</Typography>
                  </Box>
                }
              />
              <TreeItem
                itemId="1-2"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">About</Typography>
                  </Box>
                }
              />
              <TreeItem
                itemId="1-3"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">Services</Typography>
                  </Box>
                }
              />
            </TreeItem>
            <TreeItem
              itemId="2"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FolderIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">Blogs</Typography>
                </Box>
              }
            >
              <TreeItem
                itemId="2-1"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">Post 1</Typography>
                  </Box>
                }
              />
              <TreeItem
                itemId="2-2"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">Post 2</Typography>
                  </Box>
                }
              />
            </TreeItem>
            <TreeItem
              itemId="3"
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FolderIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">Assets</Typography>
                </Box>
              }
            >
              <TreeItem
                itemId="3-1"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">Images</Typography>
                  </Box>
                }
              />
              <TreeItem
                itemId="3-2"
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon sx={{ fontSize: 16 }} />
                    <Typography variant="body2">Documents</Typography>
                  </Box>
                }
              />
            </TreeItem>
          </SimpleTreeView>
        </Box>
      </CardContent>
    </Card>
  );
}

