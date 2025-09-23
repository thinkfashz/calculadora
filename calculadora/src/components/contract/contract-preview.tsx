'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { FullContractData } from '@/lib/schemas';
import { Logo } from './logo';

interface ContractPreviewProps {
  data: FullContractData;
}

function DataPlaceholder({
  value,
  placeholder,
}: {
  value?: string | number;
  placeholder: string;
}) {
  return (
    <span className="font-bold text-primary">
      {value || `[${placeholder}]`}
    </span>
  );
}

export function ContractPreview({ data }: ContractPreviewProps) {
  const formatAmount = (amount?: number) => {
    if (amount === undefined || amount === null) return '';
    return new Intl.NumberFormat('es-CL').format(amount);
  };
  
  return (
    <Card id="contract-preview" className="lg:sticky lg:top-20">
      <CardContent id="contract-preview-content" className="p-8 md:p-12 text-sm text-gray-700 dark:text-gray-300">
        <header className="mb-10 text-center">
          <Logo className="mx-auto mb-4 h-auto w-48" />
          <h1 className="font-headline text-3xl font-bold text-foreground">
            PACTO DE ACCIONISTAS
          </h1>
          <h2 className="text-xl text-muted-foreground">CASAS FABRICK SpA</h2>
        </header>

        <p className="mb-6">
          En Linares, a{' '}
          <DataPlaceholder
            value={data.agreementDay}
            placeholder="Día"
          /> de{' '}
          <DataPlaceholder
            value={data.agreementMonth}
            placeholder="Mes"
          /> de{' '}
          <DataPlaceholder
            value={data.agreementYear}
            placeholder="Año"
          />, entre:
        </p>
        <p className="mb-2">
          Por una parte,{' '}
          <b>
            <DataPlaceholder
              value={data.founderName}
              placeholder="TU NOMBRE COMPLETO"
            />
          </b>
          , cédula de identidad número{' '}
          <b>
            <DataPlaceholder value={data.founderRut} placeholder="Tu RUT" />
          </b>
          , domiciliado en{' '}
          <b>
            <DataPlaceholder
              value={data.founderDomicile}
              placeholder="Tu Domicilio"
            />
          </b>
          , en adelante el "Fundador";
        </p>
        <p className="mb-6">
          Y por la otra parte,{' '}
          <b>
            <DataPlaceholder
              value={data.investorName}
              placeholder="NOMBRE DEL INVERSIONISTA"
            />
          </b>
          , cédula de identidad número{' '}
          <b>
            <DataPlaceholder
              value={data.investorRut}
              placeholder="RUT del Inversionista"
            />
          </b>
          , domiciliado en{' '}
          <b>
            <DataPlaceholder
              value={data.investorDomicile}
              placeholder="Domicilio del Inversionista"
            />
          </b>
          , en adelante el "Inversionista";
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="mt-6 mb-2 text-base font-bold text-foreground">
              PRIMERO: ANTECEDENTES.
            </h3>
            <p>
              Los comparecientes son los únicos accionistas de la sociedad "Casas
              Fabrick SpA", RUT N°{' '}
              <DataPlaceholder
                value={data.companyRut}
                placeholder="RUT de la Empresa"
              />
              , en adelante "la Sociedad". Este pacto regula sus relaciones, la
              administración y la distribución de utilidades, en adición a los
              estatutos sociales.
            </p>
          </div>

          <div>
            <h3 className="mt-6 mb-2 text-base font-bold text-foreground">
              SEGUNDO: ADMINISTRACIÓN Y TOMA DE DECISIONES.
            </h3>
            <p>
              La administración de la Sociedad corresponderá en su totalidad al
              Fundador, don{' '}
              <b>
                <DataPlaceholder
                  value={data.founderName}
                  placeholder="TU NOMBRE COMPLETO"
                />
              </b>
              . Para decisiones estratégicas, el Administrador consultará al
              Inversionista, pero la decisión final recaerá exclusivamente en el
              Administrador.
            </p>
          </div>

          <div>
            <h3 className="mt-6 mb-2 text-base font-bold text-foreground">
              TERCERO: POLÍTICA DE DISTRIBUCIÓN DE UTILIDADES.
            </h3>
            <p>
              La Utilidad Bruta de cada proyecto (ingreso total menos costos
              directos) se distribuirá de la siguiente manera:
            </p>
            <ul className="mt-2 list-disc list-inside pl-4">
              <li>Un <b>30% (treinta por ciento)</b> para el Inversionista.</li>
              <li>Un <b>30% (treinta por ciento)</b> para el Fundador.</li>
              <li>
                Un <b>40% (cuarenta por ciento)</b> para un "Fondo de Recuperación de
                Capital y Reinversión".
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mt-6 mb-2 text-base font-bold text-foreground">
              CUARTO: MECANISMO DE RETORNO DE LA INVERSIÓN.
            </h3>
            <p>
              El Inversionista ha aportado un capital de{' '}
              <b>
                $
                <DataPlaceholder
                  value={formatAmount(data.investmentAmount)}
                  placeholder="Monto"
                />{' '}
                (
                <DataPlaceholder
                  value={data.investmentAmountInWords}
                  placeholder="Monto en Palabras"
                />{' '}
                pesos chilenos)
              </b>
              , en adelante "el Capital Invertido". El 40% de la Utilidad Bruta
              se destinará a devolver este capital.
            </p>
          </div>
          
          <div>
            <h3 className="mt-6 mb-2 text-base font-bold text-foreground">QUINTO: CESE DE PARTICIPACIÓN POST-RECUPERACIÓN.</h3>
            <p>Una vez que el Inversionista haya recibido el 100% de su Capital Invertido, su derecho a recibir el 30% de las utilidades de futuros proyectos cesará de forma automática y permanente. A partir de ese momento, el Inversionista quedará exento de la participación en las ganancias de la Sociedad.</p>
          </div>
          
          <div>
            <h3 className="mt-6 mb-2 text-base font-bold text-foreground">SEXTO: CESIÓN DE ACCIONES POST-RECUPERACIÓN.</h3>
            <p>Como consecuencia de lo establecido en la cláusula anterior, y una vez completado el retorno del 100% del Capital Invertido, el Inversionista se obliga a ceder y transferir la totalidad de sus acciones en la Sociedad al Fundador, o a quien este designe. Dicha cesión se realizará a título gratuito, por cuanto su valor se considera pagado con el retorno de la inversión y la participación en las utilidades durante el periodo de recuperación. Las partes se comprometen a firmar todos los documentos necesarios para perfeccionar esta cesión en un plazo no mayor a 30 días hábiles desde la notificación del pago final.</p>
          </div>

          <div>
            <h3 className="mt-6 mb-2 text-base font-bold text-foreground">SÉPTIMO: CONFIDENCIALIDAD Y ACUERDO COMPLETO.</h3>
            <p>Las partes se obligan a mantener estricta confidencialidad sobre este acuerdo. Este pacto representa el entendimiento total y completo entre las partes, reemplazando cualquier acuerdo verbal o escrito previo.</p>
          </div>

          <div>
            <h3 className="mt-6 mb-2 text-base font-bold text-foreground">OCTAVO: SOLUCIÓN DE CONTROVERSIAS Y VIGENCIA.</h3>
            <p>Para todos los efectos legales, las partes fijan su domicilio en la ciudad de Linares. El presente pacto tendrá una duración indefinida mientras los comparecientes mantengan su calidad de accionistas.</p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:gap-16">
          <div className="text-center">
            <div className="mx-auto mt-3 w-3/4 border-t border-gray-700 dark:border-gray-400"></div>
            <p className="mt-2 font-bold">
              <DataPlaceholder
                value={data.founderName}
                placeholder="TU NOMBRE COMPLETO"
              />
            </p>
            <p className="text-sm text-muted-foreground">
              RUT: <DataPlaceholder value={data.founderRut} placeholder="Tu RUT" />
            </p>
            <p className="text-sm font-bold">FUNDADOR / ADMINISTRADOR</p>
          </div>
          <div className="text-center">
            <div className="mx-auto mt-3 w-3/4 border-t border-gray-700 dark:border-gray-400"></div>
            <p className="mt-2 font-bold">
              <DataPlaceholder
                value={data.investorName}
                placeholder="NOMBRE DEL INVERSIONISTA"
              />
            </p>
            <p className="text-sm text-muted-foreground">
              RUT: <DataPlaceholder
                value={data.investorRut}
                placeholder="RUT del Inversionista"
              />
            </p>
            <p className="text-sm font-bold">INVERSIONISTA</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
