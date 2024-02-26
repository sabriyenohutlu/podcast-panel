import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Box } from "@mui/material";
import { usePodcastContext } from "../../store/podcast-context";
import "./PodcastsTable.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { LocaleText } from "../../localText";
import { db } from "../../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";

const PodcastsTable = () => {
  const { podcast, loading } = usePodcastContext();
  const [updatingTable, setUpdatingTable] = useState(false);

  const deletePodcast = async (item) => {
    setUpdatingTable(true);
    const docRef = item.doc;
    console.log(docRef);
    var referance = doc(db, "podcast", docRef);
    console.log(docRef);
    try {
      await deleteDoc(referance);
      window.alert("silindi");
      setUpdatingTable(false);
    } catch (error) {
      window.alert("bir hata meydana geldi");
      setUpdatingTable(false);
    }
  };

  const editPodcast = () => {};
  const updatePodcast = () => {};

  const columns = [
    {
      field: "image",
      type: "avatar",
      headerName: "Podcast Görseli",
      flex: 1,
      align: "center",
      renderCell: (params) => <Avatar src={params?.row?.image} />,
    },
    { field: "title", type: "string", headerName: "Başlık", flex: 1 },
    {
      field: "summary",
      type: "string",
      headerName: "Açıklama",
      flex: 1,
      align: "start",
    },
    {
      field: "speaker",
      type: "string",
      headerName: "Konuşmacı",
      flex: 1,
      align: "start",
    },
    {
      field: "category",
      type: "string",
      headerName: "Kategori",
      flex: 0.5,
      align: "start",
    },
    {
      field: "datePublished",
      type: "timestamp",
      headerName: "Paylaşılma Zamanı",
      flex: 1,
      renderCell: (params) => (
        <span>
          <small>
            {new Date(params.row.datePublished.seconds * 1000).toLocaleString()}
          </small>
        </span>
      ),
    },
    {
      field: "",
      type: "actions",
      headerName: "İşlemler",
      flex: 1,
      renderCell: (params) => (
        <div className="buttons">
          <div className="buttons-delete">
            <DeleteIcon onClick={() => deletePodcast(params.row)} />
          </div>
          <div className="buttons-edit">
            <Link to={`${params.row.doc}`}>
              <EditIcon onClick={() => editPodcast(params.row)} />
            </Link>
          </div>
        </div>
      ),
    },
  ];

  console.log(podcast)

  return (
    <Box sx={{ width: "90%", height: "100%" }}>
      <DataGrid
        rows={podcast}
        columns={columns}
        loading={loading || updatingTable}
        getRowId={(podcast) => podcast.id}
        //getEstimatedRowHeight={() => 200}
        getRowHeight={() => "auto"}
        localeText={LocaleText}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        sx={{
          borderRadius: "20px",
          borderColor: "white",
          "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
            py: "15px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#1F263E",
            color: "white",
            fontSize: 16,
          },
          "& .MuiDataGrid-row": {
            "&:nth-of-type(2n)": { backgroundColor: "rgba(235, 235, 235, .3)" },
            borderTopColor: "white",
            borderTopStyle: "solid",
            color: "#24272B",
          },
        }}
      />
    </Box>
  );
};

export default PodcastsTable;
