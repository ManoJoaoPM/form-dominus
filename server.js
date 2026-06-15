import express from 'express';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Rota da API para envio do lead
app.post('/api/lead', async (req, res) => {
  try {
    const data = req.body;
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `Novo Lead Dominus: ${data.name || 'Sem nome'}`,
      html: `
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 32px 16px;">
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                  
                  <!-- Header Preto/Laranja -->
                  <tbody>
                    <tr>
                      <td style="background-color:#000000;padding:0">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tbody>
                            <tr>
                              <td width="6" style="background-color:#ff6b00;font-size:0;line-height:0">&nbsp;</td>
                              <td style="padding:24px 32px">
                                <table cellpadding="0" cellspacing="0" border="0">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <span style="font-family:Arial,Helvetica,sans-serif;font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-0.5px">DOMINUS</span>
                                        <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:400;color:#ff6b00;letter-spacing:2px;display:block;margin-top:2px">ASSESSORIA IMOBILIARIA</span>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td align="right" style="padding:24px 32px">
                                <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:bold;color:#ff6b00;letter-spacing:1px;text-transform:uppercase;background-color:rgba(255,107,0,0.1);padding:6px 12px;border-radius:4px;">NOVO LEAD</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <!-- Corpo do Email -->
                    <tr>
                      <td style="padding:40px 40px 32px 40px">
                        
                        <h1 style="font-family:Arial,Helvetica,sans-serif;font-size:26px;font-weight:900;color:#111111;line-height:1.25;margin:0 0 20px 0;letter-spacing:-0.5px">
                          Um novo lead preencheu o formulário
                        </h1>
                        
                        <table width="48" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px">
                          <tbody>
                            <tr><td height="3" style="background-color:#ff6b00;font-size:0;line-height:0">&nbsp;</td></tr>
                          </tbody>
                        </table>

                        <!-- Dados do Lead -->
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px">
                          <tbody>
                            <tr>
                              <td style="padding-bottom: 12px;">
                                <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#999999;text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:4px;">Nome do Contato</span>
                                <span style="font-family:Arial,Helvetica,sans-serif;font-size:18px;color:#333333;font-weight:bold;">${data.name}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 12px;">
                                <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#999999;text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:4px;">Imobiliária</span>
                                <span style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#333333;">${data.company}</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 12px;">
                                <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#999999;text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:4px;">WhatsApp</span>
                                <a href="https://wa.me/55${data.phone?.replace(/\D/g, '')}" style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#ff6b00;text-decoration:none;font-weight:bold;">${data.phone}</a>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-bottom: 12px;">
                                <span style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#999999;text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:4px;">E-mail Corporativo</span>
                                <a href="mailto:${data.email}" style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#ff6b00;text-decoration:none;">${data.email}</a>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <!-- Qualificação / Respostas -->
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 20px 0;">
                          <tbody>
                            <tr>
                              <td width="4" style="background-color:#ff6b00;border-radius:2px;font-size:0">&nbsp;</td>
                              <td style="padding:16px 20px;background-color:#fff5ee;border-radius:0 4px 4px 0">
                                <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333333;line-height:1.6;margin:0 0 12px 0;">
                                  <strong>Perfil de Imóveis:</strong><br/>
                                  ${data.profile}
                                </p>
                                <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333333;line-height:1.6;margin:0 0 12px 0;">
                                  <strong>Desafios enfrentados:</strong><br/>
                                  ${data.challenges?.join(' <span style="color:#ff6b00">•</span> ')}
                                </p>
                                <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333333;line-height:1.6;margin:0 0 12px 0;">
                                  <strong>Investimento Mensal:</strong><br/>
                                  ${data.investment}
                                </p>
                                <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#333333;line-height:1.6;margin:0;">
                                  <strong>Site/Instagram:</strong><br/>
                                  ${data.link ? `<a href="${data.link}" target="_blank" style="color:#ff6b00;">${data.link}</a>` : 'Não informado'}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table cellpadding="0" cellspacing="0" border="0" style="margin:32px 0 8px 0; width: 100%;">
                          <tbody>
                            <tr>
                              <td align="center" style="background-color:#ff6b00;border-radius:6px">
                                <a href="https://wa.me/55${data.phone?.replace(/\D/g, '')}" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;display:block;padding:16px 32px;letter-spacing:0.3px" target="_blank">
                                  Chamar Lead no WhatsApp →
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </td>
                    </tr>

                    <!-- Divisor -->
                    <tr>
                      <td style="padding:0 40px">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tbody><tr><td height="1" style="background-color:#eeeeee;font-size:0;line-height:0">&nbsp;</td></tr></tbody>
                        </table>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding:28px 40px 32px 40px;background-color:#fafafa">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tbody>
                            <tr>
                              <td>
                                <p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#111111;margin:0 0 4px 0">Dominus Marketing</p>
                                <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;margin:0 0 2px 0">Assessoria de crescimento para imobiliárias</p>
                                <p style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#666666;margin:0">
                                  <a href="https://dominusmkt.com" style="color:#ff6b00;text-decoration:none" target="_blank">dominusmkt.com</a>
                                  &nbsp;·&nbsp;
                                  <a href="https://instagram.com/dominusmkt" style="color:#ff6b00;text-decoration:none" target="_blank">@dominusmkt</a>
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro no envio de e-mail:', error);
    res.status(500).json({ error: 'Falha ao enviar e-mail' });
  }
});

// Serve arquivos estáticos do React em produção
app.use(express.static(path.join(__dirname, 'dist')));

// Redireciona qualquer outra rota para o index.html (React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
