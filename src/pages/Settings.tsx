import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import SettingRowString from "../components/SettingsRow";
import { useSettings } from "../contexts/Settings";

function SettingsPage() {
  const [Settings, SetSettings] = useSettings();
  return (
    <TableContainer component={Paper}>
    <Table aria-label="settings">
      <TableHead>
        <TableRow>
          <TableCell>Setting</TableCell>
          <TableCell align="right">Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <SettingRowString settingName='FleetLink URI' settingValue={Settings.backendURI} updateValue={(newValue) => SetSettings({ backendURI: newValue })}/>
        <SettingRowString settingName='FleetLink Token' settingValue={Settings.backendKey} updateValue={(newValue) => SetSettings({ backendKey: newValue })}/>
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default SettingsPage;