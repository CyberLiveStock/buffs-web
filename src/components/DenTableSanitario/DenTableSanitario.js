import axios from "axios";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./DenTableSanitario.module.css";

const DenTable = ({ infoTag, infoEspec }) => {
  const [bufalos, setBufalos] = useState([]);

  const filteredBufalos = bufalos.filter((bufalo) =>
    bufalo.tagBufalo.toString().includes(infoTag)
  );

    useEffect(() => {
        const fetchBufalos = async () => {
            try {
                const response = await axios.get("http://localhost:4000/bufalos");
                setBufalos(response.data.bufalos); //'bubalinos' array de bubalinos
                console.log(bufalos);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBufalos(); // Chamando a função para executar a requisição
    }, []); // '[]' dependência do useEffect


    return (
        <div style={{ position: "absolute", top: "30px", left: "200px" }}>
            <Popover placement="start-right">
                <PopoverTrigger>
                    <span><i class="fa-solid fa-circle-info"></i></span>
                </PopoverTrigger>
                <PopoverContent>
                    <Card style={{ backgroundColor: "#f9f9f9", borderRadius: "8px", width: "450px", minHeight: "150px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", marginLeft: "420px" }}>
                        <CardBody>
                            <div className={styles.divInfosFunc}>
                                <table className="table table-striped" id="funcionariosTable">
                                    <thead>
                                        <tr>
                                            <th scope="col" className={styles.headerCell}>Nome</th>
                                            <th scope="col" className={styles.headerCell}>Data Aplicação</th>
                                            <th scope="col" className={styles.headerCell}>Data Retorno</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredBufalos.map((bufalo) => (
                                            <>
                                                {/* Exibindo o dado atual */}
                                                <tr key={`${bufalo._id}-atual`}>
                                                    <td className="text-center">{bufalo?.sanitario?.[0]?.[infoEspec] || "Sem dados atuais"}</td>
                                                    <td className="text-center">
                                                        {bufalo?.sanitario?.[0]?.dataAplicacao
                                                            ? new Date(bufalo.sanitario[0].dataAplicacao).toLocaleDateString("pt-BR", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })
                                                            : "Sem dados atuais"}
                                                    </td>
                                                    <td className="text-center">
                                                        {bufalo?.sanitario?.[0]?.dataRetorno
                                                            ? new Date(bufalo.sanitario[0].dataRetorno).toLocaleDateString("pt-BR", {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            })
                                                            : "Sem dados atuais"}
                                                    </td>
                                                </tr>
                                                {/* Iterando sobre os dados do histórico Sanitario */}
                                                {bufalo.historicoSanitario?.length > 0 ? (
                                                    bufalo.historicoSanitario.map((historico, index) => (
                                                        <tr key={`${bufalo._id}-historico-${index}`}>
                                                            <td className="text-center">{historico?.[infoEspec] || "Sem dados"}</td>
                                                            <td className="text-center">
                                                                {historico?.dataAplicacao
                                                                    ? new Date(historico.dataAplicacao).toLocaleDateString("pt-BR", {
                                                                        day: "2-digit",
                                                                        month: "2-digit",
                                                                        year: "numeric",
                                                                    })
                                                                    : "Sem dados"}
                                                            </td>
                                                            <td className="text-center">
                                                                {historico?.dataRetorno
                                                                    ? new Date(historico.dataRetorno).toLocaleDateString("pt-BR", {
                                                                        day: "2-digit",
                                                                        month: "2-digit",
                                                                        year: "numeric",
                                                                    })
                                                                    : "Sem dados"}
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr key={`${bufalo._id}-sem-historico`}>
                                                        <td className="text-center" colSpan={2}>Sem histórico</td>
                                                    </tr>
                                                )}
                                            </>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardBody>
                    </Card>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default DenTable;
