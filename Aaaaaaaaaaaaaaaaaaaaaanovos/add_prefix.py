import re

file_path = r"c:\Users\igore\Desktop\clientes\PROJETOS-HTML\Aaaaaaaaaaaaaaaaaaaaaanovos\descriçãosenhordanet.html"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# CSS and HTML class replacements
replacements = [
    (r'\.descricao-section\b', '.SENHORNET-descricao-section'),
    (r'\.descricao-content\b', '.SENHORNET-descricao-content'),
    (r'\.descricao-text\b', '.SENHORNET-descricao-text'),
    (r'\.video-placeholder\b', '.SENHORNET-video-placeholder'),
    (r'\.detalhes-section\b', '.SENHORNET-detalhes-section'),
    (r'\.detalhes-title\b', '.SENHORNET-detalhes-title'),
    (r'\.detalhes-cards\b', '.SENHORNET-detalhes-cards'),
    (r'\.detail-card\b', '.SENHORNET-detail-card'),
    (r'\.detail-card-text\b', '.SENHORNET-detail-card-text'),
    (r'\.detalhes-icons\b', '.SENHORNET-detalhes-icons'),
    (r'\.icon-item\b', '.SENHORNET-icon-item'),
    (r'\.materials-badge\b', '.SENHORNET-materials-badge'),
    (r'\.medidas-section\b', '.SENHORNET-medidas-section'),
    (r'\.medidas-title\b', '.SENHORNET-medidas-title'),
    (r'\.medidas-content\b', '.SENHORNET-medidas-content'),
    (r'\.medidas-image\b', '.SENHORNET-medidas-image'),
    (r'\.medidas-text\b', '.SENHORNET-medidas-text'),
    (r'\.faq-section\b', '.SENHORNET-faq-section'),
    (r'\.faq-title\b', '.SENHORNET-faq-title'),
    (r'\.faq-subtitle\b', '.SENHORNET-faq-subtitle'),
    (r'\.faq-item\b', '.SENHORNET-faq-item'),
    (r'\.faq-question\b', '.SENHORNET-faq-question'),
    (r'\.faq-plus\b', '.SENHORNET-faq-plus'),
    (r'\.faq-answer\b', '.SENHORNET-faq-answer'),
    (r'\.avaliacoes-section\b', '.SENHORNET-avaliacoes-section'),
    (r'\.avaliacoes-title\b', '.SENHORNET-avaliacoes-title'),
    (r'\.avaliacoes-subtitle\b', '.SENHORNET-avaliacoes-subtitle'),
    (r'\.avaliacao-card\b', '.SENHORNET-avaliacao-card'),
    (r'\.avatar\b', '.SENHORNET-avatar'),
    (r'\.stars\b', '.SENHORNET-stars'),
    (r'\.avaliacao-text\b', '.SENHORNET-avaliacao-text'),
    (r'\.ver-mais\b', '.SENHORNET-ver-mais'),
    (r'\.cliente-info\b', '.SENHORNET-cliente-info'),
    (r'\.cliente-nome\b', '.SENHORNET-cliente-nome'),
    (r'\.cliente-data\b', '.SENHORNET-cliente-data'),
    (r'class="container"', 'class="SENHORNET-container"'),
]

for old_pattern, new_pattern in replacements:
    content = re.sub(old_pattern, new_pattern, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Prefixo SENHORNET- adicionado com sucesso a todas as classes!")
